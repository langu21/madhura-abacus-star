import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Brain, Target, ArrowRight, X, 
  CheckCircle2, XCircle, Clock, Loader2, Sparkles, Bot
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error('Firestore Error: ', error);
  throw new Error(JSON.stringify({
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  }));
}

interface Question {
  question: string;
  answer: number;
  explanation: string;
}

export default function AIMentalMathTrainer({ onClose, studentId }: { onClose: () => void, studentId: string }) {
  const [step, setStep] = useState<'lobby' | 'quiz' | 'result'>('lobby');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState<{ correct: boolean, time: number }[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  const fetchQuestion = async (level = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, difficulty: 'medium' })
      });
      const data = await res.json();
      setQuestions(prev => [...prev, data]);
      setStartTime(Date.now());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuiz = async () => {
    setStep('quiz');
    await fetchQuestion();
  };

  const handleAnswer = async () => {
    const timeTaken = (Date.now() - startTime) / 1000;
    const isCorrect = parseFloat(userAnswer) === questions[currentIndex].answer;
    
    const newResult = { correct: isCorrect, time: timeTaken };
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    setUserAnswer('');

    if (updatedResults.length >= 5) {
      setStep('result');
      await finishSession(updatedResults);
    } else {
      setCurrentIndex(prev => prev + 1);
      await fetchQuestion();
    }
  };

  const finishSession = async (finalResults: any[]) => {
    setIsLoading(true);
    const score = (finalResults.filter(r => r.correct).length / finalResults.length) * 100;
    const avgSpeed = finalResults.reduce((acc, r) => acc + r.time, 0) / finalResults.length;

    try {
      // 1. Save to Firestore
      const sessionPath = 'mentalMathSessions';
      await addDoc(collection(db, sessionPath), {
        studentId,
        score,
        accuracy: score,
        speed: avgSpeed,
        timestamp: serverTimestamp(),
        difficulty: 'medium'
      });

      // 2. Get AI Analysis
      const analysisRes = await fetch('/api/ai/analyze-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionHistory: finalResults })
      });
      const analysisData = await analysisRes.json();
      setAiSuggestions(analysisData);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'mentalMathSessions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
      {/* Corner Decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-[100%] blur-3xl" />
      <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors z-50">
        <X size={20} />
      </button>

      <AnimatePresence mode="wait">
        {step === 'lobby' && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center py-10"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <Zap size={40} className="fill-current" />
            </div>
            <h2 className="text-3xl font-black mb-4">AI Mental Math Trainer</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
              Our AI will generate 5 adaptive questions. Are you ready to test your speed and accuracy?
            </p>
            <button
              onClick={startQuiz}
              className="bg-primary text-white px-12 py-5 rounded-2.5xl font-bold text-lg shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all transform hover:-translate-y-1"
            >
              Start Session
            </button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="py-10"
          >
            <div className="flex items-center justify-between mb-12">
               <div className="flex items-center space-x-2">
                 <div className="text-xs font-black uppercase tracking-widest text-slate-400">Question</div>
                 <div className="text-lg font-black text-primary">{results.length + 1} / 5</div>
               </div>
               <div className="h-2 w-32 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(results.length / 5) * 100}%` }}
                    className="h-full bg-primary" 
                 />
               </div>
            </div>

            <div className="text-center mb-16">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-24">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="mb-4">
                    <Loader2 size={40} className="text-primary" />
                  </motion.div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Generating Challenge...</p>
                </div>
              ) : (
                <motion.h3 
                  key={questions[currentIndex]?.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black tracking-tighter"
                >
                  {questions[currentIndex]?.question}
                </motion.h3>
              )}
            </div>

            <div className="max-w-xs mx-auto">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                autoFocus
                placeholder="?"
                className="w-full text-center text-4xl font-black py-6 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl mb-8 focus:ring-4 focus:ring-primary/20 transition-all outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleAnswer()}
              />
              <button
                onClick={handleAnswer}
                disabled={!userAnswer || isLoading}
                className="w-full bg-slate-900 dark:bg-slate-700 text-white py-5 rounded-2.5xl font-black text-lg hover:bg-primary transition-all flex items-center justify-center space-x-2 disabled:opacity-30"
              >
                <span>Submit Answer</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6"
          >
            <div className="text-center mb-12">
               <div className="w-20 h-20 bg-green-100 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 size={40} />
               </div>
               <h2 className="text-3xl font-black mb-2">Session Complete!</h2>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Great work on finishing your training</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="glass p-6 rounded-3xl text-center">
                 <p className="text-[10px] font-black uppercase opacity-50 tracking-widest mb-1">Score</p>
                 <p className="text-3xl font-black text-primary">{results.filter(r => r.correct).length * 20}%</p>
              </div>
              <div className="glass p-6 rounded-3xl text-center">
                 <p className="text-[10px] font-black uppercase opacity-50 tracking-widest mb-1">Avg Speed</p>
                 <p className="text-3xl font-black text-secondary">{(results.reduce((acc, r) => acc + r.time, 0) / results.length).toFixed(1)}s</p>
              </div>
              <div className="glass p-6 rounded-3xl text-center col-span-2 md:col-span-1">
                 <p className="text-[10px] font-black uppercase opacity-50 tracking-widest mb-1">Questions</p>
                 <p className="text-3xl font-black text-blue-500">5/5</p>
              </div>
            </div>

            {isLoading ? (
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-center text-white">
                  <Loader2 size={32} className="text-white animate-spin mx-auto mb-4" />
                  <p className="font-bold text-sm uppercase tracking-widest opacity-70">AI Analyzing your performance...</p>
               </div>
            ) : aiSuggestions && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] animate-pulse" />
                <div className="relative z-10">
                   <div className="flex items-center space-x-3 mb-6">
                     <div className="p-2 bg-primary text-white rounded-xl">
                       <Bot size={20} />
                     </div>
                     <div>
                       <h4 className="font-bold">AI Tutor Insights</h4>
                       <p className="text-[10px] opacity-50 uppercase font-black">Personalized Feedback</p>
                     </div>
                   </div>

                   <p className="text-sm italic text-slate-300 mb-6 leading-relaxed">
                     "{aiSuggestions.summary}"
                   </p>

                   <div className="space-y-3">
                     <p className="text-[10px] uppercase font-black opacity-30 tracking-widest">Recommended Focus</p>
                     <div className="flex flex-wrap gap-2">
                       {aiSuggestions.suggestions.map((s: string, i: number) => (
                         <span key={i} className="text-[10px] bg-white/10 px-3 py-1.5 rounded-full border border-white/10 font-bold flex items-center">
                           <Sparkles size={10} className="mr-2 text-primary" /> {s}
                         </span>
                       ))}
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            <button 
              onClick={onClose}
              className="w-full mt-10 text-slate-500 font-bold text-sm hover:text-primary transition-colors"
            >
              Back to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
