import React from 'react';
import hero from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';
import { AiFillAudio } from 'react-icons/ai'; // For the microphone icon
import { FaSlidersH } from 'react-icons/fa'; // For the sliders icon
import { FiTrendingUp } from 'react-icons/fi'; // For the trend icon

const About = () => {
    const navigate = useNavigate();
    
    return (
        <div
            className="min-h-screen bg-black bg-cover bg-fixed bg-no-repeat text-white flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${hero})` }}
        >
            <nav className="absolute top-0 left-0 right-0 flex justify-between mx-10 p-5">
                <div onClick={()=>navigate("/")} className="text-2xl hover:cursor-pointer font-bold bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5]">
                    Project SIH
                </div>
                <div className="space-x-4">
                    <span onClick={() => navigate("/about")} className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer">
                        About
                    </span>
                    <span onClick={() => navigate("/team")} className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer">
                        Team
                    </span>
                </div>
            </nav>

            <div className="text-left text-lg px-10  mt-20">
                


<p>Problem Statement ID: 1680</p>
<br/>
<p>Problem Statement Title: Few Shot Language Agnostic Keyword Spotting System (FSLAKWS) for Audio Files</p>
<br/>
<p>Description:

The problem statement envisages the development of a Few Shot Language Agnostic Keyword Spotting (FSLAKWS) system capable of localizing and classifying keywords of interest in variable-duration audio files. The system is designed to function effectively with very few examples per keyword

provided during training. Key features include: 
<br/>Language Agnosticism: The system must be capable of identifying keywords regardless of the language.

<br/>Sample Rate Flexibility: The system should handle audio files recorded at various sample rates (8k-48k).
<br/> Keyword Upgradability. The system should be upgradable to recognize additional keywords over time.</p>
<br/>
<p>Organization: National Technical Research Organisation (NTRO)</p>
<br/>
<p>
  About Our FSLAKWS System
<br/>
Our FSLAKWS system is a powerful tool designed to accurately identify and locate keywords in audio files, regardless of language or duration. The system operates through three key phases:
</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className=" p-6 rounded-md text-center">
                    <div className='bg-white bg-opacity-10 w-20 rounded-md border-[1px] border-white h-20 flex justify-center items-center mx-auto '><AiFillAudio size={40} className="mx-auto text-blue-400" /></div>
                    <h3 className="text-xl font-semibold mt-4">Phase 1: Speech-to-Vector Conversion</h3>
                    <p className="mt-2">
                        Using Whisper, the first step involves converting the audio input into vector embeddings. This process is language agnostic, enabling the system to work with multiple languages.
                    </p>
                </div>

                <div className=" p-6 rounded-md text-center">
                    <div className='bg-white bg-opacity-10 w-20 rounded-md border-[1px] border-white h-20 flex justify-center items-center mx-auto'><FaSlidersH size={40} className="mx-auto text-blue-400" /></div>
                    <h3 className="text-xl font-semibold mt-4">Phase 2: Fine-Tuned Embeddings for Keyword Spotting</h3>
                    <p className="mt-2">
                        Once the speech is converted into vector embeddings, these embeddings are fine-tuned on a pre-trained model using a large corpus to ensure accurate keyword spotting.
                    </p>
                </div>

                <div className=" p-6 rounded-md text-center">
                    <div className='bg-white bg-opacity-10 w-20 rounded-md border-[1px] border-white h-20 flex justify-center items-center mx-auto'><FiTrendingUp size={40} className="mx-auto text-blue-400" /></div>
                    <h3 className="text-xl font-semibold mt-4">Phase 3: Similarity Matching with Sliding Window</h3>
                    <p className="mt-2">
                        The core of the keyword spotting process lies in a similarity matching algorithm with a sliding window technique, allowing precise localization of keywords.
                    </p>
                </div>
            </div>

           
        </div>
    );
};

export default About;
