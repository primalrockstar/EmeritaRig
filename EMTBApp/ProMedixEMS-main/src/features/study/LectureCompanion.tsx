import React, { useEffect } from 'react';
import { Mic, Square, Save, FileText, Trash2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import GlassContainer from '../../components/ui/GlassContainer';
import { useLectureRecorder } from '../../hooks/useLectureRecorder';
import SmartTranscript from './components/SmartTranscript';

const LectureCompanion: React.FC = () => {
  const {
    devices,
    selectedDeviceId,
    isRecording,
    transcript,
    getAudioDevices,
    setSelectedDevice,
    startRecording,
    stopRecording,
  } = useLectureRecorder();

  useEffect(() => {
    getAudioDevices();
  }, [getAudioDevices]);
  return (
    <GlassContainer>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Lecture Companion</h1>
        <p className="text-gray-300">AI-Powered Transcription & Analysis</p>
      </div>

      {/* Microphone Selector */}
      <GlassCard className="p-4 mb-6">
        <div className="text-center">
          <label htmlFor="mic-select" className="block text-sm font-medium text-gray-300 mb-2">
            Select Microphone
          </label>
          {devices.length === 0 ? (
            <p className="text-red-400 text-sm">Permission Denied - Enable microphone access to see available devices</p>
          ) : (
            <select
              id="mic-select"
              value={selectedDeviceId}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="bg-slate-800/60 border border-white/10 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          )}
        </div>
      </GlassCard>

      {/* Control Panel */}
      <GlassCard className="p-6 mb-6">
        <div className="flex justify-center">
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="flex items-center justify-center w-24 h-24 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-full transition-colors shadow-lg"
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="flex items-center justify-center w-16 h-16 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 rounded-full ml-4 transition-colors"
          >
            <Square className="w-6 h-6 text-white" />
          </button>
        </div>
      </GlassCard>

      {/* Transcript Area */}
      <GlassCard className="p-6 mb-6">
        <SmartTranscript transcript={transcript} />
      </GlassCard>

      {/* Action Bar */}
      <div className="flex justify-center space-x-4">
        <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg">
          <Save className="w-5 h-5 mr-2" />
          Save Note
        </button>
        <button className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-lg">
          <FileText className="w-5 h-5 mr-2" />
          Export PDF
        </button>
        <button className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg">
          <Trash2 className="w-5 h-5 mr-2" />
          Clear
        </button>
      </div>
    </GlassContainer>
  );
};

export default LectureCompanion;