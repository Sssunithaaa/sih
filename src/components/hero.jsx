import React, { useState,useEffect } from 'react';
import { FaCheckCircle, FaCircle, FaUpload, FaCheck } from 'react-icons/fa';
import hero from '../assets/hero.png'; // Make sure to use the correct path to your image
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AudioRecorder from './AudioRecorder';
import AudioUpload from './AudioUpload';
import AudioRecorderer from './AudioRecorder';

const HomePage = () => {
   const [masterAudioBlob, setMasterAudioBlob] = useState(null);
  const [slaveAudioBlob, setSlaveAudioBlob] = useState(null);
  const [matchResponse, setMatchResponse] = useState(null);

  const [master, setMaster] = useState(true);
  const [slave, setSlave] = useState(false);
  const [masterRec, setMasterRec] = useState(true);
  const [slaveRec, setSlaveRec] = useState(false);
  const [language, setLanguage] = useState(false);
  const [keyword, setKeyword] = useState(false);
  

  const navigate = useNavigate();

  const [showMaster,setShowMaster] = useState(true);
  const [showSlave,setShowSlave] = useState(true)

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
  setMatchResponse(data)
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


// For testing purposes, you can set the matchResponse state directly like this:
// useEffect(() => {
//   setMatchResponse({
//     master_transcription: "Hello, this is a test recording for the master audio.",
//     slave_transcription: "Hello, this is a test recording for the slave audio.",
//     matched_phrase: "test recording",
//     match_start_index: 15,
//     similarity_ratio: 0.85
//   });
// }, []);

// useEffect(()=> {
//   if(matchResponse){
//     setLanguage(true);
//     setKeyword(true)
//   }
// },[matchResponse])



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
              <div className={`h-[2px] w-16 ${master ? "bg-green-500" : "bg-gray-500"}`}></div>
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
              // <div className='w-80 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer'>Language</div>
              <div></div>
            ) : keyword ? (
              <div></div>
            ) : (
              <div className='flex flex-row justify-between gap-x-10'>
                <div>
                 <AudioUpload master={true} setMasterAudioBlob={setMasterAudioBlob} setMasterRec={setMasterRec}></AudioUpload>
                 {masterRec}

                  {showMaster && <AudioRecorderer label="master" onRecordingComplete={onMasterRecordingComplete} />}
                 
                </div>
                <div>
                  <AudioUpload slave={true} setSlaveAudioBlob={setSlaveAudioBlob} setSlaveRec={setSlaveRec}></AudioUpload>
                  {slaveRec}
                  {!showSlave &&           <div className='px-5 py-3 w-[20%] flex mx-auto justify-center items-center rounded-md text-md hover:cursor-pointer  bg-gradient-to-b  from-[#1BCBBF] to-[#3476E5] ' onClick={sendAudioToBackend}>Get result</div>
}
                  {showSlave && <AudioRecorderer label="slave" onRecordingComplete={onSlaveRecordingComplete} />}
                 
                </div>
              </div>
            )}
          </div>
          {matchResponse ?  
     <div className="bg-white bg-opacity-10 p-6 mt-8 rounded-lg ">
       <h2 className="text-2xl font-semibold mb-4">Match Results</h2>
       <p><strong>Master Transcription:</strong> {matchResponse.master_transcription}</p>
       <p><strong>Slave Transcription:</strong> {matchResponse.slave_transcription}</p>
       <p><strong>Matched Phrase:</strong> {matchResponse.matched_phrase}</p>
       <p><strong>Match Start Index:</strong> {matchResponse.match_start_index}</p>
       <p><strong>Similarity Ratio:</strong> {matchResponse.similarity_ratio}</p>
     </div>
  :  <div className='px-5 py-3 w-[20%] flex mx-auto justify-center items-center rounded-md text-md hover:cursor-pointer  bg-gradient-to-b  from-[#1BCBBF] to-[#3476E5] ' onClick={sendAudioToBackend}>Get result</div>}
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
