import { useState } from 'react';
import { motion } from 'motion/react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user with default student role
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'student',
          createdAt: serverTimestamp(),
          studentProfile: {
            level: 1,
            age: 0,
            school: ''
          }
        });
      }

      navigate('/dashboard');
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass rounded-[3rem] p-10 md:p-12 shadow-2xl relative z-10 border border-white/50"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-extrabold mb-3">Welcome Back</h1>
          <p className="text-sm text-slate-500 font-medium">Unlock your AI-powered learning journey</p>
        </div>

        <div className="space-y-6">
          <button
            onClick={signIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pwa/google.svg" className="w-6 h-6" alt="Google" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute inset-0 flex items-center text-slate-300"><div className="w-full border-t border-slate-300 dark:border-slate-700"></div></div>
            <span className="relative z-10 px-4 bg-white dark:bg-slate-800 rounded-full text-[10px] uppercase font-black tracking-widest text-slate-400">Secure Access</span>
          </div>

          <div className="space-y-4">
            {[
              { icon: ShieldCheck, text: "Data encryption enabled" },
              { icon: Sparkles, text: "AI features initialized on login" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 text-xs text-slate-500">
                <item.icon size={14} className="text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            By signing in, you agree to our <a href="#" className="text-primary font-bold">Terms</a> and <a href="#" className="text-primary font-bold">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
