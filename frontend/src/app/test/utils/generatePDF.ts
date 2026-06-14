import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PDFData {
    profileName: string;
    profileDesc: string;
    top5: { name: string; faculty: string; pct: number }[];
    strengths: string[];
    date: string;
}

export function generateVocationalPDF(data: PDFData) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Colores institucionales
    const utpRed = '#C8102E';
    const darkText = '#1C1C1C';
    const grayText = '#666666';

    // Header (Fondo Rojo)
    doc.setFillColor(utpRed);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor('#FFFFFF');
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Resultados del Test Vocacional', 15, 25);

    // Fecha
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de evaluación: ${data.date}`, pageWidth - 15, 25, { align: 'right' });

    // Perfil Principal
    doc.setTextColor(darkText);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Tu Perfil Vocacional Principal', 15, 55);

    doc.setFontSize(18);
    doc.setTextColor(utpRed);
    doc.text(data.profileName, 15, 65);

    doc.setTextColor(grayText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitDesc = doc.splitTextToSize(data.profileDesc, pageWidth - 30);
    doc.text(splitDesc, 15, 75);

    let startY = 75 + (splitDesc.length * 6) + 10;

    // Fortalezas
    doc.setTextColor(darkText);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Fortalezas Destacadas', 15, startY);
    
    startY += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayText);
    data.strengths.forEach((strength) => {
        doc.text(`• ${strength}`, 20, startY);
        startY += 7;
    });

    startY += 10;

    // Top 5 Carreras
    doc.setTextColor(darkText);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Top 5 Carreras Recomendadas', 15, startY);
    
    startY += 8;

    const tableData = data.top5.map((c, i) => [
        `#${i + 1}`,
        c.name,
        c.faculty,
        `${c.pct}%`
    ]);

    autoTable(doc, {
        startY: startY,
        head: [['Rank', 'Carrera', 'Facultad', 'Afinidad']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: utpRed, textColor: '#FFFFFF' },
        styles: { font: 'helvetica', fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 15, halign: 'center' },
            3: { cellWidth: 25, halign: 'center', textColor: utpRed, fontStyle: 'bold' }
        }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 20;

    // Recomendaciones Finales
    doc.setTextColor(darkText);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Recomendaciones Finales', 15, finalY);

    doc.setTextColor(grayText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const finalMsg = doc.splitTextToSize(
        'Este test es una herramienta de orientación y autoconocimiento, no una decisión definitiva. Los resultados reflejan tendencias basadas en tus respuestas actuales. Te recomendamos complementar esta información investigando la malla curricular de estas carreras y consultando con un orientador profesional.',
        pageWidth - 30
    );
    doc.text(finalMsg, 15, finalY + 10);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text('Generado por Orientador Vocacional UTP', pageWidth / 2, 280, { align: 'center' });

    doc.save('Resultado_Vocacional_UTP.pdf');
}
