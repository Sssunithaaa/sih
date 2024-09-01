import React from 'react'
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa6';

const AudioUpload = ({slave,setSlaveAudioBlob,master,setMasterAudioBlob}) => {
     const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
   

   
      if(slave){
        setSlaveAudioBlob(file);
      } else if(master) {
        setMasterAudioBlob(file)
      }
    
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav'],
    },
  });
  return (
    <div>
        <div  {...getRootProps()} className="w-96 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer">
                    <input {...getInputProps()} />
                    <FaUpload className="text-4xl text-gray-400 mb-3" />
                    {isDragActive ? (
                      <span className="text-gray-400">Drop the files here ...</span>
                    ) : (
                      <span className="text-gray-400">Drag & drop files or <span className="text-blue-500 underline">Browse</span></span>
                    )}
                    <span className="text-xs text-gray-500">Supported formats: MP3/WAV</span>
                  </div>
    </div>
  )
}

export default AudioUpload