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
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      
      const data = await response.json();
      
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the service.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
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
                    ? t('form.welcome_chat', 'Hello! I am the My Corporate Cars AI assistant. How can I help you today?') 
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
