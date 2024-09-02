import React, { useRef, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import WaveSurfer from "wavesurfer.js";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

const AudioRecorder = ({ label, onClose, onRecordingComplete, height = 100 }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null); 
  const [isRecordingComplete, setIsRecordingComplete] = useState(false); 

  useEffect(() => {
    if (waveformRef.current) {  
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#D9DCFF",
        progressColor: "#4353FF",
        cursorColor: "#4353FF",
        barWidth: 2,
        responsive: true,
        height: height,
      });
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [height, isRecordingComplete]);  

  const handleDataAvailable = async (blobUrl) => {
    setMediaBlobUrl(blobUrl);  
  

    if (wavesurfer.current) {
      wavesurfer.current.load(blobUrl);
    }

    const response = await fetch(blobUrl);
    const webmBlob = await response.blob();

    convertWebmToWav(webmBlob, (wavBlob) => {
      const file = new File([wavBlob], `${label}.wav`, { type: "audio/wav" });
      onRecordingComplete(file);
    });
  
  };
  

  return (
    <div className="bg-white bg-opacity-10 px-10 py-5 my-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{label === "master" ? "Sample corpus" : "Keyword"}</h2>
        {onClose && (
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <FaTimes size={20} />
          </button>
        )}
      </div>
      <ReactMediaRecorder
        audio
        onStop={handleDataAvailable}
        render={({  startRecording, stopRecording }) => (
          <>
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

      
            <div className="mt-4" ref={waveformRef} />

   
            {mediaBlobUrl && (
              <div className="mx-auto flex justify-center items-center mt-4">
                <audio src={mediaBlobUrl} controls />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};


function convertWebmToWav(webmBlob, callback) {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.decodeAudioData(fileReader.result, function (buffer) {
      const wavBlob = bufferToWav(buffer);
      callback(wavBlob);
    });
  };
  fileReader.readAsArrayBuffer(webmBlob);
}

function bufferToWav(buffer) {
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  let wav = new Uint8Array(44 + buffer.length * numberOfChannels * 2);
  let view = new DataView(wav.buffer);

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + buffer.length * numberOfChannels * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, 'data');
  view.setUint32(40, buffer.length * numberOfChannels * 2, true);

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = buffer.getChannelData(channel)[i];
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([wav], { type: 'audio/wav' });
}

export default AudioRecorder;
