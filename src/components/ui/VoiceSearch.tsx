'use client';

import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { Mic, X } from 'lucide-react';

// Simplified type definitions for browser Speech Recognition API
/* eslint-disable @typescript-eslint/no-explicit-any */

interface VoiceSearchProps {
  onResult: (query: string) => void;
  placeholder?: string;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.onresult = (event: any) => {
        const last = event.results[event.results.length - 1];
        const text = last[0].transcript;
        setTranscript(text);
        if (last.isFinal) {
          onResult(text);
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onResult]);

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative flex items-center">
      {isListening && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Listening...</span>
            <button onClick={stopListening} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
          {transcript && (
            <p className="text-gray-900">{transcript}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary-600 animate-pulse" style={{ width: '60%' }} />
            </div>
            <span className="text-xs text-gray-500">Speaking...</span>
          </div>
        </div>
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={isListening ? stopListening : startListening}
        className={isListening ? 'bg-red-50 text-red-600' : ''}
      >
        <Mic className={isListening ? 'animate-pulse w-5 h-5' : 'w-5 h-5'} />
      </Button>
    </div>
  );
}