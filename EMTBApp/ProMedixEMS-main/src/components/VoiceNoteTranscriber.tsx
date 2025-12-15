// Voice Note Transcriber Tool
// Professional Audio-to-Text Transcription for EMT-B Study Notes
// Real-time transcription with medical terminology recognition

import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Download, 
  FileText, 
  Save, 
  Copy, 
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  Headphones,
  Activity,
  Pill,
  BookOpen
} from 'lucide-react';
import { NATIONAL_PROTOCOL_FOUNDATION } from '../data/national-protocols';

interface TranscriptionSegment {
  id: string;
  text: string;
  timestamp: number;
  confidence: number;
  duration: number;
  speakerLabel?: string;
}

interface ClinicalAnalysis {
  vitals: string[];
  symptoms: string[];
  medications: string[];
  protocols: string[];
}

interface VoiceNoteTranscriberProps {
  onSave?: (transcription: string, title: string) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    webkitSpeechGrammarList: any;
    SpeechGrammarList: any;
    webkitAudioContext: any;
  }
}

const VoiceNoteTranscriber: React.FC<VoiceNoteTranscriberProps> = ({ onSave, onClose }) => {
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [analysis, setAnalysis] = useState<ClinicalAnalysis | null>(null);

  // Transcription state
  const [transcriptionSegments, setTranscriptionSegments] = useState<TranscriptionSegment[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [confidence, setConfidence] = useState(0);

  // UI state
  const [noteTitle, setNoteTitle] = useState('');
  const [folderName, setFolderName] = useState('General');
  const [savedMessage, setSavedMessage] = useState('');
  const [error, setError] = useState('');
  const [availableFolders, setAvailableFolders] = useState<string[]>(['General', 'Patient Assessments', 'Study Notes', 'Clinical Rotations']);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isRecordingRef = useRef(false); // Track recording state for callbacks

  // Medical terminology dictionary for enhanced recognition
  const medicalTerms = [
    'auscultation', 'palpation', 'percussion', 'inspection',
    'tachycardia', 'bradycardia', 'hypotension', 'hypertension',
    'dyspnea', 'orthopnea', 'cyanosis', 'pallor',
    'syncope', 'epistaxis', 'hemoptysis', 'hematemesis',
    'pneumothorax', 'tamponade', 'anaphylaxis', 'myocardial',
    'cerebrovascular', 'pneumonia', 'COPD', 'asthma',
    'diabetes', 'hypoglycemia', 'hyperglycemia', 'seizure',
    'NSTEMI', 'STEMI', 'atrial fibrillation', 'ventricular',
    'defibrillation', 'cardioversion', 'intubation', 'cricothyrotomy'
  ];

  // Initialize speech recognition
  useEffect(() => {
    // Load folders from localStorage
    const savedFolders = JSON.parse(localStorage.getItem('voiceNoteFolders') || '[]');
    if (savedFolders.length > 0) {
      setAvailableFolders(prev => [...new Set([...prev, ...savedFolders])]);
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList;
      
      recognitionRef.current = new SpeechRecognition();
      
      // Add medical grammar if supported
      if (SpeechGrammarList) {
        const speechRecognitionList = new SpeechGrammarList();
        const grammar = '#JSGF V1.0; grammar medical; public <term> = ' + medicalTerms.join(' | ') + ' ;';
        speechRecognitionList.addFromString(grammar, 1);
        recognitionRef.current.grammars = speechRecognitionList;
      }
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 3;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;

          if (event.results[i].isFinal) {
            setConfidence(confidence);
            
            // Add to segments
            const newSegment: TranscriptionSegment = {
              id: `segment-${Date.now()}`,
              text: transcript,
              timestamp: Date.now(),
              confidence: confidence,
              duration: 0
            };
            
            setTranscriptionSegments(prev => [...prev, newSegment]);
          } else {
            interimTranscript += transcript;
          }
        }

        setCurrentTranscript(interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
           setError('Microphone access denied. Please allow microphone access.');
           setIsTranscribing(false);
        } else if (event.error === 'no-speech') {
           // Ignore no-speech errors, just keep listening if recording
        } else {
           // Only show other errors if we are actually trying to record
           if (isRecordingRef.current) {
             setError(`Speech recognition error: ${event.error}`);
           }
        }
      };

      recognitionRef.current.onend = () => {
        // Auto-restart if we are still recording
        if (isRecordingRef.current) {
            try {
                recognitionRef.current.start();
                console.log('Restarting speech recognition...');
            } catch (e) {
                console.error('Failed to restart recognition:', e);
                setIsTranscribing(false);
            }
        } else {
            setIsTranscribing(false);
        }
      };
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
      setError('Failed to initialize speech recognition.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Visualizer
  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(249, 250, 251)'; // bg-gray-50
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = '#10B981'; // neon green

      canvasCtx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  // Start recording and transcription
  const startRecording = async () => {
    try {
      setError('');

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Microphone access is not supported in this browser or context (HTTPS required).');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      streamRef.current = stream;

      // Setup Audio Context for Visualizer
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 2048;
          source.connect(analyser);
          analyserRef.current = analyser;
          drawVisualizer();
        }
      } catch (e) {
        console.warn('AudioContext not supported or failed to initialize', e);
      }

      // Determine supported MIME type
      let mimeType = '';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/aac')) {
        mimeType = 'audio/aac';
      }
      
      const options = mimeType ? { mimeType } : undefined;

      mediaRecorderRef.current = new MediaRecorder(stream, options);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onerror = (event: any) => {
        console.error('MediaRecorder error:', event.error);
        setError('Recording error occurred.');
      };

      mediaRecorderRef.current.onstop = () => {
        const blobType = mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: blobType });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        }
      };

      mediaRecorderRef.current.start(100);
      setIsRecording(true);
      isRecordingRef.current = true;
      setRecordingTime(0);
      setAnalysis(null); // Clear previous analysis

      // Start speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsTranscribing(true);
        } catch (e) {
          console.error('Failed to start recognition:', e);
          // It might be already started
        }
      }

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      setError('Failed to access microphone. Please check permissions.');
      console.error('Recording error:', err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    
    // Don't stop recognition immediately here, let onend handle it or stop it explicitly
    // But we set isRecordingRef to false so onend won't restart it
    isRecordingRef.current = false;
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsRecording(false);
    setIsTranscribing(false);
  };

  // Analyze Clinical Context
  const analyzeClinicalContext = () => {
    const fullText = getFullTranscription().toLowerCase();
    
    // Simple regex-based extraction (simulation of AI analysis)
    const vitalsRegex = /\b(bp|blood pressure|pulse|heart rate|respirations?|breathing|spo2|oxygen|temp|temperature)\b[^.]*/gi;
    const symptomsRegex = /\b(pain|ache|swelling|bleeding|dizzy|nausea|vomit|shortness of breath|dyspnea|weakness)\b[^.]*/gi;
    const medsRegex = /\b(aspirin|nitro|nitroglycerin|epi|epinephrine|albuterol|glucose|narcan|naloxone)\b[^.]*/gi;

    const vitals = (fullText.match(vitalsRegex) || []).map(s => s.trim());
    const symptoms = (fullText.match(symptomsRegex) || []).map(s => s.trim());
    const medications = (fullText.match(medsRegex) || []).map(s => s.trim());

    // Protocol Matching
    const matchedProtocols = NATIONAL_PROTOCOL_FOUNDATION.filter(protocol => {
      const keywords = [...protocol.clinicalIndications, ...protocol.keyPoints].map(k => k.toLowerCase());
      return keywords.some(k => fullText.includes(k));
    }).map(p => p.title);

    setAnalysis({
      vitals: [...new Set(vitals)],
      symptoms: [...new Set(symptoms)],
      medications: [...new Set(medications)],
      protocols: [...new Set(matchedProtocols)]
    });
  };

  // Play/pause audio
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get full transcription text
  const getFullTranscription = () => {
    return transcriptionSegments.map(segment => segment.text).join(' ') + ' ' + currentTranscript;
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getFullTranscription());
      setSavedMessage('Copied to clipboard!');
      setTimeout(() => setSavedMessage(''), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  // Save transcription
  const saveTranscription = () => {
    const fullText = getFullTranscription();
    const title = noteTitle || `Voice Note ${new Date().toLocaleDateString()}`;
    
    if (onSave) {
      onSave(fullText, title);
    }
    
    // Save to localStorage as backup
    const savedNotes = JSON.parse(localStorage.getItem('voiceNotes') || '[]');
    savedNotes.push({
      id: Date.now(),
      title,
      folder: folderName,
      transcription: fullText,
      date: new Date().toISOString(),
      segments: transcriptionSegments
    });
    localStorage.setItem('voiceNotes', JSON.stringify(savedNotes));
    
    // Update available folders if new one created
    if (!availableFolders.includes(folderName)) {
      const newFolders = [...availableFolders, folderName];
      setAvailableFolders(newFolders);
      localStorage.setItem('voiceNoteFolders', JSON.stringify(newFolders));
    }
    
    setSavedMessage(`Note saved to "${folderName}" successfully!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  // Download as text file
  const downloadTranscription = () => {
    const fullText = getFullTranscription();
    const title = noteTitle || `voice-note-${Date.now()}`;
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear transcription
  const clearTranscription = () => {
    setTranscriptionSegments([]);
    setCurrentTranscript('');
    setNoteTitle('');
    setRecordingTime(0);
  };

  const averageConfidence = transcriptionSegments.length > 0 
    ? transcriptionSegments.reduce((sum, seg) => sum + seg.confidence, 0) / transcriptionSegments.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Note Transcriber</h1>
                <p className="text-gray-600">Professional audio-to-text transcription with medical terminology support</p>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Recording Controls */}
          <div className="bg-gray-50 border-b border-gray-200">
            {/* Visualizer */}
            <div className="h-32 w-full bg-gray-900 relative">
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={128} 
                className="w-full h-full"
              />
              {!isRecording && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                  <p>Ready to record</p>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center justify-center space-x-8">
                  {/* Record Button */}
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isTranscribing && !isRecording}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600 text-white scale-110 animate-pulse' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                      }`}
                      title={isRecording ? "Stop Recording" : "Start Recording"}
                    >
                      {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      {isRecording ? 'Stop' : 'Record'}
                    </span>
                  </div>

                  {/* Playback Button */}
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={togglePlayback}
                      disabled={!audioRef.current?.src || isRecording}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                        !audioRef.current?.src || isRecording
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
                      }`}
                      title={isPlaying ? "Pause Playback" : "Play Recording"}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      {isPlaying ? 'Pause' : 'Play'}
                    </span>
                  </div>

                  {/* Clear Button */}
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={clearTranscription}
                      disabled={isRecording || (!currentTranscript && transcriptionSegments.length === 0)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                        isRecording || (!currentTranscript && transcriptionSegments.length === 0)
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-500 hover:bg-gray-600 text-white hover:scale-105'
                      }`}
                      title="Clear All"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </button>
                    <span className="text-sm font-medium text-gray-700">Clear</span>
                  </div>
                </div>

                {/* Status Text */}
                <div className="h-6 text-center">
                  {isRecording && (
                    <span className="text-red-500 font-medium animate-pulse flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Recording in progress... ({formatTime(recordingTime)})
                    </span>
                  )}
                  {error && (
                    <span className="text-red-600 font-medium flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Note Title and Folder */}
          <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note Title
              </label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Enter a title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="folders"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Select or create folder..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <datalist id="folders">
                  {availableFolders.map((folder, index) => (
                    <option key={index} value={folder} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Transcription Display */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Live Transcription</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadTranscription}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={saveTranscription}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Transcription Text */}
            <div className="bg-gray-50 rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
              {transcriptionSegments.length === 0 && !currentTranscript ? (
                <div className="text-center text-gray-500 py-16">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No transcription yet</p>
                  <p className="text-sm mt-2">Click the record button to start transcribing your voice notes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transcriptionSegments.map((segment, index) => (
                    <div key={segment.id} className="flex items-start space-x-3">
                      <span className="text-xs text-gray-500 mt-1 w-12">
                        {new Date(segment.timestamp).toLocaleTimeString().slice(0, 5)}
                      </span>
                      <p className="text-gray-800 flex-1">
                        {segment.text}
                        <span className="ml-2 text-xs text-gray-500">
                          ({Math.round(segment.confidence * 100)}%)
                        </span>
                      </p>
                    </div>
                  ))}
                  {currentTranscript && (
                    <div className="flex items-start space-x-3">
                      <span className="text-xs text-blue-500 mt-1 w-12">Live</span>
                      <p className="text-blue-600 flex-1 italic">{currentTranscript}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Clinical Analysis */}
          <div className="p-6 border-t border-gray-200 bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Clinical Analysis</h3>
              <button
                onClick={analyzeClinicalContext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span>Analyze Context</span>
              </button>
            </div>

            {analysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-500" /> Vitals Detected
                  </h4>
                  {analysis.vitals.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysis.vitals.map((v, i) => (
                        <span key={i} className="px-2 py-1 bg-rose-50 text-rose-700 rounded text-sm border border-rose-100">
                          {v}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No vitals detected</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" /> Symptoms
                  </h4>
                  {analysis.symptoms.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysis.symptoms.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm border border-amber-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No symptoms detected</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4 text-purple-500" /> Medications
                  </h4>
                  {analysis.medications.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysis.medications.map((m, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm border border-purple-100">
                          {m}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No medications detected</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" /> Matched Protocols
                  </h4>
                  {analysis.protocols.length > 0 ? (
                    <ul className="space-y-1">
                      {analysis.protocols.map((p, i) => (
                        <li key={i} className="text-sm text-blue-700 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" /> {p}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No specific protocols matched</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          {error && (
            <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {savedMessage && (
            <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700">{savedMessage}</span>
            </div>
          )}

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceNoteTranscriber;