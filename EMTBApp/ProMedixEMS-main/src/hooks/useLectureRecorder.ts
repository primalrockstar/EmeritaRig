import { useState, useCallback, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export interface MediaDeviceInfo {
  deviceId: string;
  kind: string;
  label: string;
}

export const useLectureRecorder = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const {
    transcript: speechTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(speechTranscript);
  }, [speechTranscript]);

  useEffect(() => {
    setIsRecording(listening);
  }, [listening]);

  const getAudioDevices = useCallback(async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = deviceList.filter(device => device.kind === 'audioinput');
      setDevices(audioInputs);
      if (audioInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(audioInputs[0].deviceId);
      }
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  }, [selectedDeviceId]);

  const setSelectedDevice = useCallback((deviceId: string) => {
    setSelectedDeviceId(deviceId);
  }, []);

  const startRecording = useCallback(async () => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser does not support speech recognition.');
      return;
    }
    try {
      // Reset transcript before starting
      resetTranscript();
      // Start listening
      SpeechRecognition.startListening({ continuous: true });
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [browserSupportsSpeechRecognition, resetTranscript]);

  const stopRecording = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  return {
    devices,
    selectedDeviceId,
    isRecording,
    transcript,
    getAudioDevices,
    setSelectedDevice,
    startRecording,
    stopRecording,
  };
};