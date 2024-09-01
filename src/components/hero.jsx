import React, { useCallback,useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCheckCircle, FaCircle, FaUpload,FaCheck } from 'react-icons/fa';
import hero from '../assets/hero.png'; // Make sure to use the correct path to your image
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
   const [master, setMaster] = useState(true)
  const [slave, setSlave] = useState(false)
  const [language, setLanguage] = useState(false)
  const [keyword, setKeyword] = useState(false)
    const onDrop = useCallback((acceptedFiles) => {
    // Handle the accepted files here (upload, display, etc.)
    setSelectedFile(acceptedFiles)
    handleUpload();
    setSlave(true)
    
  }, []);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

 

  const handleUpload = () => {
    if (!selectedFile) return;

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
      setUploadProgress(0);  // Reset progress after upload
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      setUploadProgress(0);  // Reset progress after upload
    });
  };

 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav'],
    }
  });
  const navigate = useNavigate()
  return (
    <div
      className="min-h-screen h-screen bg-black bg-cover bg-fixed bg-no-repeat text-white flex flex-col items-center justify-center"
     
    >
      {/* Navbar */}
      <nav className="absolute  top-0 left-0 right-0 flex justify-between mx-10 p-5">
        <div className="text-2xl font-bold bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] ">Project SIH</div>
        <div className="space-x-4">
          <span onClick={()=>navigate("/about")} className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer tex hover:text-blue-500">About</span>
          <span onClick={()=>navigate("/team")} href="#" className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer hover:text-blue-500">Team</span>
        </div>
      </nav>

      {/* Main Content */}
      <div  style={{ backgroundImage: `url(${hero})` }} className='flex justify-center items-center w-full h-full'>
        <div  className="text-center mt-4">
        <h1 className='text-3xl font-semibold bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] '>FluffyPeanuts SIH 2024</h1>
         <h1 className='text-lg'>Problem Statement ID - 1608</h1>
        <h1 className="text-3xl my-2 font-semibold">
          Few Shot Language Agnostic Keyword Spotting System
        </h1>
        <p className="max-w-md my-3  mx-auto text-gray-300">
          Organization - National Technical Research Organization (NTRO)
        </p>

        {/* Steps Section */}
       <div className='w-96 h-32 mt-8 bg-white rounded-lg flex mx-auto bg-opacity-10 flex-col items-center justify-center border-gray-600 hover:border-gray-400 cursor-pointer'>
        <div className="flex items-center justify-center">
          <StepIcon isActive={master} label="Master" />
          <div className={`h-[2px] w-16 ${slave ? "bg-green-500" : "bg-gray-500"} `}></div> {/* Connecting line */}
          <StepIcon isActive={slave} label="Slave" />
          <div className={`h-[2px] w-16 ${language ? "bg-green-500" : "bg-gray-500"} `}></div> {/* Connecting line */}
          <StepIcon isActive={language} label="Language" />
          <div className={`h-[2px] w-16 ${keyword ? "bg-green-500" : "bg-gray-500"} `}></div> {/* Connecting line */}
          <StepIcon isActive={keyword} label="Result" />
        </div>
        <div className="flex items-center justify-center px-2 mt-0">
          <NameIcon label="Master" />
          <div className="h-1 w-12 bg-transparent"></div> {/* Connecting line */}
          <NameIcon label="Slave" />
          <div className="h-1 w-12 bg-transparent"></div> {/* Connecting line */}
          <NameIcon label="Language" />
          <div className="h-1 w-12 bg-transparent"></div> {/* Connecting line */}
          <NameIcon label="Result" />
        </div>
       </div>

        {/* File Upload Section */}
       <div className="mt-8">
        {language ? <div className='w-80 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer'>Language</div> : keyword ? <div className='w-80 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer'>Keyword</div> : <div><div {...getRootProps()} className="w-96 h-40 bg-white bg-opacity-10 rounded-lg flex mx-auto flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer">
          <input {...getInputProps()} />
          <FaUpload className="text-4xl text-gray-400 mb-3" />
          {isDragActive ? (
            <span className="text-gray-400">Drop the files here ...</span>
          ) : (
            <span className="text-gray-400">Drag & drop files or <span className="text-blue-500 underline">Browse</span></span>
          )}
          <span className="text-xs text-gray-500">Supported formats: MP3/WAV</span>
        </div>
        {selectedFile && (
        <div className="my-2">
          <button onClick={handleUpload} className="bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded">
            Upload
          </button>
        </div>
      )}
      {uploadProgress>0 && (
        <div className="relative pt-1 max-w-md mx-auto">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-2 px-2  bg-blue-800">
                Uploading...
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {uploadProgress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${uploadProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            />
          </div>
        </div>
      )}</div>}
      </div>
      </div>
      </div>
    </div>
   
  );
};

const StepIcon = ({ isActive }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-green-500' : 'bg-green-500'}`}>
        {isActive ? (
          <FaCheck className="text-white text-xl" />
        ) : (
          <FaCircle className="text-white text-3xl" />
        )}
      </div>
      {/* <span className="text-sm text-white mt-2">{label}</span> */}
    </div>
  );
}

  const NameIcon = ({ label }) => {
  return (
    <div className="flex flex-col items-center">
      
      <span className="text-sm text-center text-white mt-2">{label}</span> 
    </div>
  );
};

export default HomePage;
