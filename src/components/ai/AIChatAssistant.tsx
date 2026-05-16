import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Maximize2, Minimize2 } from 'lucide-react';

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: 'Hi there! I am the Madhura AI Assistant. I can help you with course details, fees, or even schedule a demo for your child. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having some trouble connecting. Please try again or call us directly!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`glass mb-4 overflow-hidden rounded-[2rem] shadow-2xl flex flex-col transition-all duration-300 ${isExpanded ? 'w-[400px] h-[600px]' : 'w-[350px] h-[500px]'}`}
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Madhura AI</h3>
                  <div className="flex items-center space-x-1 opacity-80">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px]">Online Support</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-white/10 rounded-lg">
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 shadow-sm rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t dark:border-slate-700">
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 rounded-2xl p-2 px-4 border border-transparent focus-within:border-primary transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 bg-primary text-white rounded-xl disabled:opacity-50 hover:bg-primary-dark transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center">
                <Sparkles size={10} className="mr-1 text-primary" /> Powered by Gemini AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="relative z-10" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-white"
        />
      </motion.button>
    </div>
  );
}
