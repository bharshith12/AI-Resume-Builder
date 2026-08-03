import React, { useState, useContext } from 'react';
import { Sparkles, X, Send, Bot, User, RefreshCw, Lightbulb } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { ResumeContext } from '../../context/ResumeContext';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI Resume & ATS Career Coach. How can I help optimize your resume today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { resumeData } = useContext(ResumeContext);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await aiService.sendChatMessage(userMsg, resumeData);
      setMessages(prev => [...prev, { sender: 'bot', text: res.result || res.message }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: "I analyzed your request. Make sure to use strong action verbs, quantifiable metrics, and align keywords directly with your target job description." }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "How to boost my ATS score?",
    "Suggest strong action verbs",
    "How to format projects section?",
    "Improve my summary"
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/20"
      >
        <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
        <span>Ask AI Assistant</span>
      </button>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">ResumAI Career Coach</h3>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online & Context Aware
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800/80 text-slate-200 border border-white/10 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                  <RefreshCw size={14} className="animate-spin text-blue-400" />
                  AI is analyzing resume context...
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="p-3 bg-slate-950/40 border-t border-white/5 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => { setInput(q); }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-white/5 transition-colors flex items-center gap-1"
                >
                  <Lightbulb size={10} className="text-amber-400" /> {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2 bg-slate-950">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your resume..."
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
