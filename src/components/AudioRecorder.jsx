import React, { useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import WaveSurfer from "wavesurfer.js";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

const AudioRecorder = ({ label, onClose,onRecordingComplete }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    // Initialize WaveSurfer when the component mounts
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#D9DCFF",
        progressColor: "#4353FF",
        cursorColor: "#4353FF",
        barWidth: 2,
        responsive: true,
        height: 100,
      });
    }

    return () => {
      // Cleanup WaveSurfer instance when the component unmounts
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  const handleDataAvailable = (blobUrl) => {
    // Load recorded audio into WaveSurfer for playback
    if (wavesurfer.current) {
      wavesurfer.current.load(blobUrl);
    }

    
          
            onRecordingComplete(blobUrl);
        
      
    
  };

  return (
    <div className="bg-white bg-opacity-10 px-10 py-5 my-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        {/* Label */}
        <h2 className="text-lg font-semibold">{label}</h2>
        {/* Close Button */}
        {onClose && (
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <FaTimes size={20} />
          </button>
        )}
      </div>
      <ReactMediaRecorder
        audio
        onStop={handleDataAvailable}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <>
            {/* Audio Controls */}
            <div className="flex gap-x-5 mx-auto w-full justify-center items-center mt-5">
              <button
                onClick={startRecording}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                <AiFillAudio size={24} />
              </button>
              <button
                onClick={stopRecording}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <AiOutlineAudioMuted size={24} />
              </button>
            </div>

            {/* Display audio waveform */}
            <div className="mt-4" ref={waveformRef} />

            {/* Audio playback after recording */}
            <div className="mx-auto flex justify-center items-center mt-4">
              {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default AudioRecorder;
