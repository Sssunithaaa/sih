import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa6';

const AudioUpload = ({ slave, setSlaveAudioBlob, master, setMasterAudioBlob, setMasterRec, setSlaveRec }) => {
  const [audioPreview, setAudioPreview] = useState(null); // State to store the audio preview URL

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    if (slave) {
      setSlaveAudioBlob(file);
      setSlaveRec(file.path);
    } else if (master) {
      setMasterAudioBlob(file);
      setMasterRec(file.path);
    }
    
    // Create a preview URL for the audio file
    const audioUrl = URL.createObjectURL(file);
    setAudioPreview(audioUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav'],
    },
  });

  // Cleanup the object URL when the component unmounts or when a new file is selected
  useEffect(() => {
    return () => {
      if (audioPreview) {
        URL.revokeObjectURL(audioPreview);
      }
    };
  }, [audioPreview]);

  return (
    <div>
      <div
        {...getRootProps()}
        className="w-96 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer"
      >
        <input {...getInputProps()} />
        <FaUpload className="text-4xl text-gray-400 mb-3" />
        {isDragActive ? (
          <span className="text-gray-400">Drop the files here ...</span>
        ) : (
          <span className="text-gray-400">
            Drag & drop files or <span className="text-blue-500 underline">Browse</span>
          </span>
        )}
        <span className="text-xs text-gray-500">Supported formats: MP3/WAV</span>
      </div>

      {audioPreview && (
        <div className="mt-4 text-center">
          
          <audio controls src={audioPreview} className="mt-2 w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
