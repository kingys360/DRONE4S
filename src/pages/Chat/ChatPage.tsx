import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Lightbulb, Leaf, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  { icon: Lightbulb, text: 'How can we reduce emissions in the Main Building?' },
  { icon: Leaf, text: 'What are the best practices for green certification?' },
  { icon: Zap, text: 'Suggest energy-efficient upgrades for labs' }
];

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on your query about "${input}", here are some recommendations:\n\n1. Install LED lighting throughout the facility\n2. Upgrade HVAC systems for better efficiency\n3. Consider solar panel installation on rooftops\n4. Implement smart building automation systems\n\nThese measures can reduce emissions by 15-25% annually.`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div>
                <div className="h-16 w-16 rounded-full bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Carbon Footprint Assistant
                </h2>
                <p className="text-neutral-400 max-w-md mx-auto">
                  Ask me anything about reducing emissions, energy efficiency, or sustainability practices on campus.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-neutral-400">Try asking:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {suggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSuggestion(suggestion.text)}
                        className="p-4 rounded-xl border border-white/10 bg-neutral-900/50 hover:bg-neutral-900/70 transition-colors text-left"
                      >
                        <Icon className="h-5 w-5 text-emerald-400 mb-2" />
                        <p className="text-sm text-neutral-300">{suggestion.text}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-4 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="h-10 w-10 rounded-full bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <Bot className="h-5 w-5 text-emerald-400" />
                      </div>
                    )}

                    <div
                      className={`max-w-2xl rounded-xl p-4 ${
                        message.role === 'user'
                          ? 'bg-emerald-600/20 border border-emerald-500/30'
                          : 'bg-neutral-900/50 border border-white/10'
                      }`}
                    >
                      <p className="text-sm text-white whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className="text-xs text-neutral-400 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <div className="h-10 w-10 rounded-full bg-sky-600/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-sky-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="max-w-2xl rounded-xl p-4 bg-neutral-900/50 border border-white/10">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about carbon reduction strategies..."
              className="flex-1 px-4 py-3 rounded-lg bg-neutral-950 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-white placeholder:text-neutral-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 disabled:cursor-not-allowed text-white transition-colors flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              Send
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            This is an AI assistant providing general recommendations. For specific implementation, consult with facilities management.
          </p>
        </div>
      </div>
    </div>
  );
}
