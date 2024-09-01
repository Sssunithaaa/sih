import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCheckCircle, FaCircle, FaUpload, FaCheck } from 'react-icons/fa';
import hero from '../assets/hero.png'; // Make sure to use the correct path to your image
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AudioRecorder from './AudioRecorder';
import AudioUpload from './AudioUpload';

const HomePage = () => {
   const [masterAudioBlob, setMasterAudioBlob] = useState(null);
  const [slaveAudioBlob, setSlaveAudioBlob] = useState(null);
  const [activeDropzone, setActiveDropzone] = useState('');
  const [master, setMaster] = useState(true);
  const [slave, setSlave] = useState(false);
  const [masterRec, setMasterRec] = useState(true);
  const [slaveRec, setSlaveRec] = useState(false);
  const [language, setLanguage] = useState(false);
  const [keyword, setKeyword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleUpload = () => {


    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
      }
    })
    .then((response) => {
      console.log('File uploaded successfully:', response.data);
      setUploadProgress(0); 
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      setUploadProgress(0);  
    });
  };

  const sendAudioToBackend = async () => {
    console.log(masterAudioBlob)
    console.log(slaveAudioBlob)
const formData = new FormData();
formData.append('master_audio', masterAudioBlob, 'master_audio.wav', { type: 'audio/wav' });
formData.append('slave_audio',slaveAudioBlob, 'slave_audio.wav', { type: 'audio/wav' });
formData.append('language', 'English');

fetch('http://127.0.0.1:8000/match', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.log('Error:', error);
});
 
    
  };

 const onMasterRecordingComplete = (blob) => {
  setMasterAudioBlob(blob);
  
};

const onSlaveRecordingComplete = (blob) => {
  setSlaveAudioBlob(blob);
 
};






  return (
    <div className="min-h-screen h-full  bg-black bg-cover bg-fixed bg-no-repeat text-white flex flex-col items-center justify-center">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between mx-10 p-5">
        <div className="text-2xl font-bold bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5]">Project SIH</div>
        <div className="space-x-4">
          <span onClick={() => navigate("/about")} className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer tex hover:text-blue-500">About</span>
          <span onClick={() => navigate("/team")} className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer hover:text-blue-500">Team</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ backgroundImage: `url(${hero})` }} className='flex justify-center mt-8 py-10 items-center w-full h-full'>
        <div className="text-center mt-4">
          <h1 className='text-3xl font-semibold bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5]'>FluffyPeanuts SIH 2024</h1>
          <h1 className='text-lg'>Problem Statement ID - 1680</h1>
          <h1 className="text-3xl my-2 font-semibold">
            Few Shot Language Agnostic Keyword Spotting System
          </h1>
          <p className="max-w-md my-3 mx-auto text-gray-300">
            Organization - National Technical Research Organization (NTRO)
          </p>

          {/* Steps Section */}
          <div className='w-96 h-32 mt-8 bg-white rounded-lg flex mx-auto bg-opacity-10 flex-col items-center justify-center border-gray-600 hover:border-gray-400 cursor-pointer'>
            <div className="flex items-center justify-center">
              <StepIcon isActive={master} label="Master" />
              <div className={`h-[2px] w-16 ${slave ? "bg-green-500" : "bg-gray-500"}`}></div>
              <StepIcon isActive={language} label="Language" />
              <div className={`h-[2px] w-16 ${keyword ? "bg-green-500" : "bg-gray-500"}`}></div>
              <StepIcon isActive={keyword} label="Result" />
            </div>
            <div className="flex items-center justify-center px-2 mt-0">
              <NameIcon label="Master" />
              <div className="h-1 w-12 bg-transparent"></div>
              <NameIcon label="Language" />
              <div className="h-1 w-12 bg-transparent"></div>
              <NameIcon label="Result" />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mt-8">
            {language ? (
              <div className='w-80 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer'>Language</div>
            ) : keyword ? (
              <div className='w-80 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer'>Keyword</div>
            ) : (
              <div className='flex flex-row justify-between gap-x-10'>
                <div>
                 <AudioUpload master={true} setMasterAudioBlob={setMasterAudioBlob} setMasterRec={setMasterRec}></AudioUpload>
                 {masterRec}
                  <AudioRecorder label="master" onRecordingComplete={onMasterRecordingComplete} />
                 
                </div>
                <div>
                  <AudioUpload slave={true} setSlaveAudioBlob={setSlaveAudioBlob} setSlaveRec={setSlaveRec}></AudioUpload>
                  {slaveRec}
                  <AudioRecorder label="slave" onRecordingComplete={onSlaveRecordingComplete} />
                 
                </div>
              </div>
            )}
          </div>
          <div className='px-5 py-3 w-[20%] flex mx-auto justify-center items-center rounded-md text-md hover:cursor-pointer  bg-gradient-to-b  from-[#1BCBBF] to-[#3476E5] ' onClick={sendAudioToBackend}>Get result</div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const StepIcon = ({ isActive, label }) => (
  isActive ? <FaCheckCircle className="w-6 h-6 text-green-500" /> : <FaCircle className="w-6 h-6 text-gray-400" />
);

const NameIcon = ({ label }) => (
  <div className="text-sm text-gray-300">{label}</div>
);

export default HomePage;
