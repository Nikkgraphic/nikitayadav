import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { commandHandler } from '../lib/commands';
import { TerminalLine } from '../types/terminal';

interface TerminalProps {
  onCommand?: (command: string) => void;
}

export default function Terminal({ onCommand }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessages = [
      { type: 'system' as const, content: 'Microsoft Windows [Version 10.0.26100.H652]' },
      { type: 'system' as const, content: '(c) Microsoft Corporation. All rights reserved.' },
      { type: 'system' as const, content: '' },

      { type: 'command' as const, content: 'C:\\Users\\nikita>' },
      { type: 'system' as const, content: '' },
      { type: 'output' as const, content: "Hi, I'm Nikita Yadav, a Graphic & UI/UX Designer." },
      { type: 'output' as const, content: "Welcome to my interactive portfolio terminal!" },
      { type: 'output' as const, content: "Type 'help' to see available commands." },
      { type: 'system' as const, content: '' },
      { type: 'info' as const, content: 'help | about | projects | skills | contact | clear' }
    ];

    let index = 0;
    
    const interval = setInterval(() => {
      if (index < welcomeMessages.length) {
        setLines(prev => [...prev, welcomeMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
        // Show input after all messages are typed
        setTimeout(() => setShowInput(true), 300);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const typeMessage = useCallback(async (message: string, type: TerminalLine['type'] = 'output') => {
    setIsTyping(true);
    const chars = message.split('');
    let currentText = '';

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      
      setLines(prev => {
        const newLines = [...prev];
        const lastLineIndex = newLines.length - 1;
        if (newLines[lastLineIndex] && newLines[lastLineIndex].type === type && i > 0) {
          newLines[lastLineIndex] = { type, content: currentText };
        } else if (i === 0) {
          newLines.push({ type, content: currentText });
        }
        return newLines;
      });
      
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    setIsTyping(false);
  }, []);

  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add command line to terminal
    setLines(prev => [...prev, { type: 'command', content: `C:\\Users\\nikita>${trimmedCommand}` }]);

    // Execute command
    const response = await commandHandler(trimmedCommand);
    
    // Handle special commands
    if (typeof response === 'object' && response.content === 'CLEAR_SCREEN') {
      setLines([]);
      return;
    }
    
    if (typeof response === 'string') {
      await typeMessage(response, 'output');
    } else {
      if (response.content.includes('\n')) {
        // For multi-line content, type it out
        await typeMessage(response.content, response.type);
      } else {
        setLines(prev => [...prev, response]);
      }
    }

    onCommand?.(trimmedCommand);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    
    handleCommand(currentInput);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic auto-completion could be added here
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-button bg-destructive"></div>
          <div className="terminal-button bg-secondary"></div>
          <div className="terminal-button bg-primary"></div>
        </div>
        <div className="terminal-title">Administrator: Command Prompt - NikitaYadav@portfolio</div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Connected</span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>

      <div ref={contentRef} className="terminal-content">
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {lines.filter(line => line).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="terminal-line"
              >
                {line.type === 'command' && (
                  <span className="terminal-prompt">{line.content}</span>
                )}
                {line.type === 'output' && (
                  <span className="terminal-output">{line.content}</span>
                )}
                {line.type === 'error' && (
                  <span className="terminal-output error">{line.content}</span>
                )}
                {line.type === 'success' && (
                  <span className="terminal-output success">{line.content}</span>
                )}
                {line.type === 'info' && (
                  <span className="terminal-output info">{line.content}</span>
                )}
                {line.type === 'warning' && (
                  <span className="terminal-output warning">{line.content}</span>
                )}
                {line.type === 'system' && (
                  <span className="terminal-output text-muted-foreground">{line.content}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {showInput && (
          <motion.div 
            className="flex items-center mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex items-center w-full">
              <span className="terminal-prompt">{"C:\\Users\\nikita>"}</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input flex-1"
                placeholder=""
                disabled={isTyping}
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
              {!isTyping && <span className="terminal-cursor"></span>}
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}