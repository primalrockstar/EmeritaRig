import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Radio } from 'lucide-react';
import { GlassCard, ModernButton } from '../../components/ui/ModernGlassComponents';
import { useFTOCoach } from '../../hooks/useFTOCoach';

const VoiceHandoff: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { triggerFeedback } = useFTOCoach();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      setIsRecording(true);
      setRecordingTime(0);
      setHasRecorded(false);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Handle recording stop
      mediaRecorder.ondataavailable = (event) => {
        // Could save blob if needed
      };

      mediaRecorder.onstop = () => {
        const duration = recordingTime;
        if (duration > 30) {
          triggerFeedback('WARNING', 'Too long, partner. The nurse stopped listening. Summarize better.');
        } else if (duration < 10) {
          triggerFeedback('WARNING', 'That\'s it? You forgot the vitals. Try again.');
        } else {
          triggerFeedback('SUCCESS', 'Good handoff report. Clear and concise.');
        }
        setHasRecorded(true);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GlassCard className="p-6 max-w-md mx-auto" intensity="medium">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
          <Radio className="w-8 h-8 text-red-400" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Radio Report Practice
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Practice your handoff report. Keep it between 10-30 seconds.
        </p>

        {isRecording && (
          <div className="mb-6">
            <div className="text-2xl font-mono text-red-500 mb-2">
              {formatTime(recordingTime)}
            </div>
            <div className="flex justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {!isRecording ? (
          <ModernButton
            variant="gradient"
            onClick={startRecording}
            className="flex items-center gap-2 w-full"
          >
            <Mic className="w-4 h-4" />
            Start Radio Report
          </ModernButton>
        ) : (
          <ModernButton
            variant="glass"
            onClick={stopRecording}
            className="flex items-center gap-2 w-full"
          >
            <MicOff className="w-4 h-4" />
            Stop Recording
          </ModernButton>
        )}

        {hasRecorded && !isRecording && (
          <div className="mt-4 text-sm text-gray-500">
            Report completed in {formatTime(recordingTime)} seconds
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default VoiceHandoff;