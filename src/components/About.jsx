import React from 'react'
import hero from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';
const About = () => {
    const navigate = useNavigate()
  return (
     <div
      className="min-h-screen bg-black bg-cover bg-fixed bg-no-repeat text-white flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
         <nav className="absolute top-0 left-0 right-0 flex justify-between p-5">
        <div onClick={()=>navigate("/")} className="text-2xl hover:cursor-pointer font-bold">Project SIH</div>
        <div className="space-x-4">
          <span onClick={()=>navigate("/about")} className="hover:underline text-blue-400 hover:cursor-pointer hover:text-blue-500">About</span>
          <span onClick={()=>navigate("/team")} href="#" className="hover:underline hover:cursor-pointer hover:text-blue-500">Team</span>
        </div>
      </nav>
        <h2 className='text-center text-2xl mb-6 font-semibold uppercase'>About</h2>
        <div className='text-justify max-w-2xl mx-auto'>
         <p>About Our FSLAKWS System
Our Few Shot Language Agnostic Keyword Spotting (FSLAKWS) system is designed to efficiently identify and localize keywords in audio files, regardless of the language or audio length. The system operates in three key phases:

Speech-to-Vector Conversion Using Whisper:
We begin by converting the audio input into vector embeddings using the Whisper model. This process transforms spoken words into high-dimensional vectors that can be processed without reliance on specific languages.

Fine-Tuned Embeddings for Keyword Spotting:
Next, these vector embeddings are fine-tuned on a pre-trained model using a large corpus. This fine-tuning ensures accurate keyword spotting, even with very few training examples.

Similarity Matching with Sliding Window:
Finally, our system employs a similarity matching algorithm with a sliding window technique. This method compares segments of the audio to spot keywords precisely, ensuring effective localization and classification within the audio file.</p>
        </div>
    </div>
  )
}

export default About