import React from 'react';
import hero from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = ["Amith M","Gautam Menon","Ansh Singhal","Mandar Desurkar","Aftaab Hussain","Sunitha B"]

  return (
    <div
      className="min-h-screen bg-black bg-cover bg-fixed bg-no-repeat text-white flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <nav className="absolute  top-0 left-0 right-0 flex justify-between mx-10 p-5">
        <div className="text-2xl font-bold bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] ">Project SIH</div>
        <div className="space-x-4">
          <span onClick={()=>navigate("/about")} className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer tex hover:text-blue-500">About</span>
          <span onClick={()=>navigate("/team")} href="#" className="bg-gradient-to-b text-transparent bg-clip-text from-[#1BCBBF] to-[#3476E5] text-xl hover:underline hover:cursor-pointer hover:text-blue-500">Team</span>
        </div>
      </nav>

      <h2 className='text-center text-2xl mb-6 font-semibold uppercase'>Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            {member}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
