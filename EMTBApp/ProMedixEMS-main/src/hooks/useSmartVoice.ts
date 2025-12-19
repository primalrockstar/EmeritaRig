import { useState, useEffect, useRef, useCallback } from 'react';
import { parseVitalsFromNarrative, validateVitals, ParsedVitals } from '../utils/voiceParser';

interface UseSmartVoiceOptions {
  onVitalsDetected?: (vitals: ParsedVitals) => void;
  onTranscriptUpdate?: (transcript: string) => void;
  language?: string;
  continuous?: boolean;
}

interface UseSmartVoiceReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  isParsing: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

/**
 * React hook for smart voice recognition with vital signs parsing
 */
export function useSmartVoice(options: UseSmartVoiceOptions = {}): UseSmartVoiceReturn {
  const {
    onVitalsDetected,
    onTranscriptUpdate,
    language = 'en-US',
    continuous = true
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const lastProcessedTextRef = useRef('');

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.lang = language;
      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsParsing(false);
      };

      recognition.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
        setIsParsing(false);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        // Process all results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const currentTranscript = finalTranscript + interimTranscript;
        setTranscript(currentTranscript);

        // Call transcript update callback
        if (onTranscriptUpdate) {
          onTranscriptUpdate(currentTranscript);
        }

        // Process vitals from new text only
        if (finalTranscript && finalTranscript !== lastProcessedTextRef.current) {
          setIsParsing(true);

          // Parse vitals from the new final text
          const vitals = parseVitalsFromNarrative(finalTranscript);

          // Validate vitals
          const validation = validateVitals(vitals);
          const validVitals: ParsedVitals = {};

          Object.keys(vitals).forEach(key => {
            if (validation[key]) {
              validVitals[key as keyof ParsedVitals] = vitals[key as keyof ParsedVitals];
            }
          });

          // If we have valid vitals, call the callback
          if (Object.keys(validVitals).length > 0 && onVitalsDetected) {
            onVitalsDetected(validVitals);
          }

          lastProcessedTextRef.current = finalTranscript;
          setIsParsing(false);
        }
      };
    } else {
      setError('Speech recognition not supported in this browser');
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, continuous, onVitalsDetected, onTranscriptUpdate]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        setError('Failed to start speech recognition');
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    lastProcessedTextRef.current = '';
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    isParsing,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
}