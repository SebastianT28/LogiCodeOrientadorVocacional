import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const SYSTEM_PROMPT = `Eres Nora, un asistente de orientación vocacional de la Universidad Tecnológica del Perú (UTP). 
Tu función es ayudar a los estudiantes a descubrir su vocación y explorar las carreras disponibles en UTP. 
Responde siempre de forma amigable, empática y concisa. 
Solo habla sobre temas de orientación vocacional, carreras universitarias, el test vocacional y la universidad UTP. 
Si te preguntan temas fuera de este ámbito, recuerda educadamente tu propósito.

FORMATO DE RESPUESTA (JSON estricto, sin markdown, sin bloques de código):
Debes responder ÚNICAMENTE con un objeto JSON con exactamente este campo:
{"reply": "Tu respuesta aquí"}
`;

interface HistoryMessage {
  role: 'user' | 'model';
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history }: { message: string; history: HistoryMessage[] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje inválido.' }, { status: 400 });
    }

    // Construir el historial de conversación para Gemini
    const chatHistory = (history || []).map((h: HistoryMessage) => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.5,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json',
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message });
    const rawText = response.text ?? '';

    // Parsear la respuesta JSON de Gemini
    let reply = 'Disculpa, tuve un inconveniente al procesar tu consulta. Por favor, intenta de nuevo.';

    try {
      // Limpiar posibles bloques de código markdown que Gemini pueda agregar
      const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed.reply) reply = parsed.reply;
    } catch {
      // Fallback si el JSON falla
      reply = rawText; // A veces Gemini ignora el JSON y responde en texto plano, usamos eso como fallback
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('[Nora/Gemini Error]', error);
    return NextResponse.json(
      { reply: 'Disculpa, ocurrió un error: ' + (error.message || error.toString()) },
      { status: 500 }
    );
  }
}
