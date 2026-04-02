'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  isThinking?: boolean;
}

export function ChatbotWidget() {
  const t = useTranslations('chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: t('greeting'),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = t.raw('suggestedQuestions') as string[];

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Merci pour votre question. Ce sujet relève de l'accompagnement juridique spécialisé. Pour un avis juridique personnalisé et adapté à votre situation, nous vous recommandons de prendre rendez-vous avec l'un de nos avocats spécialisés.`,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ai-500 text-white shadow-lg transition-all duration-300 hover:bg-ai-600 hover:shadow-xl active:scale-95"
        aria-label="Open chat"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 flex w-full max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-ai-500 px-6 py-4">
            <div>
              <h3 className="text-[14px] font-semibold text-white">
                {t('title')}
              </h3>
              <p className="text-[12px] text-ai-100">
                {t('subtitle')}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white transition-colors duration-200 hover:bg-ai-600"
              aria-label="Close chat"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex h-80 flex-col gap-4 overflow-y-auto bg-gray-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2.5 text-[13px] leading-relaxed ${
                    message.type === 'user'
                      ? 'bg-ai-500 text-white'
                      : 'border border-gray-200 bg-white text-navy-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-ai-400 animate-bounce" />
                    <div
                      className="h-2 w-2 rounded-full bg-ai-400 animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="h-2 w-2 rounded-full bg-ai-400 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && !isLoading && (
            <div className="border-t border-gray-200 bg-white px-4 py-3">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-navy-900/50">
                Questions suggérées
              </p>
              <div className="space-y-2">
                {suggestedQuestions.slice(0, 2).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-[12px] text-navy-900/70 transition-all duration-200 hover:border-ai-300 hover:bg-ai-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA Bar */}
          <div className="border-t border-gray-200 bg-white px-4 py-3">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-navy-900 transition-colors duration-300 hover:bg-gold-400"
            >
              {t('contactBtn')}
            </Link>
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('placeholder')}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] placeholder-gray-400 focus:border-ai-300 focus:bg-white focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-lg bg-ai-500 px-3 py-2.5 text-white transition-colors duration-300 disabled:opacity-50 hover:bg-ai-600"
                aria-label="Send message"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>

            {/* Disclaimer */}
            <p className="mt-2 text-[10px] leading-tight text-navy-900/40">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
