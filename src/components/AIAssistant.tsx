"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './AIAssistant.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'welcome_chat' }
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const currentHistory = [...messages, userMessage];
    setMessages(currentHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentHistory })
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Service temporarily busy');
      }

      // Prepare empty message for streaming
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsLoading(false); // Stop typing indicator as soon as stream opens!

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages(prev => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
            next[lastIdx] = { role: 'assistant', content: streamedContent };
          }
          return next;
        });
      }
    } catch (error) {
      setIsLoading(false);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Our concierge is available directly. Please call +61 430 729 993 or email info@elitecarsaustralia.com.au for immediate assistance.' }
      ]);
    }
  };

  return (
    <div className={styles.assistantWrapper}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <img src="/AI-agent.jpg" alt="AI Agent" className={styles.avatarImage} />
              </div>
              <h4>{t('form.chat_header', 'Concierge')}</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}><X size={20} /></button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
                <div className={styles.messageBubble}>
                  {msg.content === 'welcome_chat'
                    ? t('form.welcome_chat', 'Hello! I am the Elite Cars Australia AI assistant. How can I help you today?')
                    : msg.content
                  }
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.messageBubble}>
                  <span className={styles.typing}>...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('form.input_placeholder', 'Type your message...')}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.fabContainer}>
          {showWelcome && (
            <div className={styles.welcomeBubble}>
              <span className={styles.welcomeText}>{t('form.welcome_msg', '👋 Welcome! Ask me anything.')}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWelcome(false);
                }}
                className={styles.welcomeCloseBtn}
                title="Dismiss welcome message"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <button className={styles.fab} onClick={() => { setIsOpen(true); setShowWelcome(false); }}>
            <img src="/AI-agent.jpg" alt="AI Agent" className={styles.fabImage} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
