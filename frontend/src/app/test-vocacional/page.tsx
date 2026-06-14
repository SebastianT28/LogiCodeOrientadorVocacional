'use client';

import { useState, useCallback } from 'react';
import LandingView from './components/LandingView';
import QuestionView from './components/QuestionView';
import LoadingView from './components/LoadingView';
import ResultsView from './components/ResultsView';
import CandidatoFormModal from '@/components/CandidatoFormModal';
import {
  QUESTIONS,
  SCORE_MAPPING,
  type Scores,
  type AreaKey,
  type ScenarioOption,
} from './data';

type Step = 'landing' | 'test' | 'loading' | 'results';

const INITIAL_SCORES: Scores = { ing: 0, neg: 0, der: 0, sal: 0, arq: 0, com: 0, edu: 0 };

export default function TestVocacionalPage() {
  const [step, setStep] = useState<Step>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [scores, setScores] = useState<Scores>({ ...INITIAL_SCORES });
  const [showModal, setShowModal] = useState(false);

  /* ---- Scoring ---- */
  const computeScore = useCallback((qi: number, newAnswers: Record<number, number | string>): Scores => {
    const running: Scores = { ...INITIAL_SCORES };

    for (let i = 0; i <= qi; i++) {
      const q = QUESTIONS[i];
      const ans = newAnswers[i];
      if (ans === undefined) continue;

      if (q.type === 'likert') {
        const val = Number(ans) || 3;
        const area = SCORE_MAPPING[i];
        if (area) running[area] += val;
      } else if (q.type === 'scenario') {
        const scores = q.scores as Record<string, string>;
        if (ans && scores[String(ans)]) {
          running[scores[String(ans)] as AreaKey] += 4;
        }
      } else if (q.type === 'ranking') {
        // ans = "2,0,4,1,3" (displayed order of original indices)
        if (typeof ans === 'string' && q.maps) {
          const order = ans.split(',').map(Number);
          order.forEach((originalIdx, displayIdx) => {
            const area = q.maps![originalIdx] as AreaKey;
            if (area) running[area] += (q.maps!.length - displayIdx);
          });
        }
      }
    }

    return running;
  }, []);

  /* ---- Handlers ---- */
  const handleAnswer = useCallback((qi: number, value: number | string) => {
    setAnswers((prev) => ({ ...prev, [qi]: value }));
  }, []);

  const handleNext = useCallback(() => {
    const updatedAnswers = { ...answers };
    // Auto-confirm ranking if not explicitly answered
    const q = QUESTIONS[currentQ];
    if (q.type === 'ranking' && updatedAnswers[currentQ] === undefined) {
      updatedAnswers[currentQ] = q.maps!.map((_, i) => i).join(',');
    }

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      // Last question — compute and show loading
      const finalScores = computeScore(currentQ, updatedAnswers);
      setScores(finalScores);
      setStep('loading');
      setTimeout(() => setStep('results'), 3800);
    }
  }, [currentQ, answers, computeScore]);

  const handlePrev = useCallback(() => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  }, [currentQ]);

  const handleStart = useCallback(() => {
    setCurrentQ(0);
    setAnswers({});
    setScores({ ...INITIAL_SCORES });
    setStep('test');
  }, []);

  const handleLandingStartClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalSuccess = useCallback((candidatoId: string) => {
    localStorage.setItem('candidatoId', candidatoId);
    setShowModal(false);
    handleStart();
  }, [handleStart]);

  const handleGoHome = useCallback(() => {
    setStep('landing');
    setCurrentQ(0);
    setAnswers({});
    setScores({ ...INITIAL_SCORES });
  }, []);

  /* ---- Render ---- */
  if (step === 'landing') {
    return (
      <>
        <LandingView onStart={handleLandingStartClick} />
        {showModal && (
          <CandidatoFormModal 
            onClose={() => setShowModal(false)}
            onSuccess={handleModalSuccess}
          />
        )}
      </>
    );
  }

  if (step === 'test')
    return (
      <QuestionView
        key={currentQ}
        currentQ={currentQ}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    );

  if (step === 'loading') return <LoadingView />;

  return (
    <ResultsView
      scores={scores}
      onRestart={handleStart}
      onGoHome={handleGoHome}
    />
  );
}
