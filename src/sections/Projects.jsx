import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState } from 'react';

import { myProjects, myProjects1 } from '../constants/index.js';

const projectCount = myProjects.length;
const projectCount1 = myProjects1.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      const newIndex =
        direction === 'previous'
          ? (prevIndex - 1 + projectCount) % projectCount
          : (prevIndex + 1) % projectCount;
      return newIndex;
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      '.animatedText',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.inOut' }
    );
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];
  const currentProject1 = myProjects1[selectedProjectIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text text-center">Join us on our journey</p>

      <div className="flex justify-center gap-5 my-10">
        <button
          onClick={() => handleNavigation('previous')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation('next')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Next
        </button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* Left Project Card */}
        <div className="relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 rounded-xl overflow-hidden bg-black-800">
          <img
            src={currentProject.spotlight}
            alt="spotlight"
            className="absolute top-0 right-0 w-full h-96 object-cover rounded-xl opacity-30 z-0"
          />
          <div className="relative z-10">
            <div
              className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg mb-5"
              style={currentProject.logoStyle}
            >
              <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
            </div>

            <div className="flex flex-col gap-5 text-white-600">
              <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
              <p className="animatedText">{currentProject.desc}</p>
              <p className="animatedText">{currentProject.subdesc}</p>
            </div>
          </div>
        </div>

        {/* Right Project Card */}
        <div className="relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 rounded-xl overflow-hidden bg-black-800">
          <img
            src={currentProject1.spotlight}
            alt="spotlight"
            className="absolute top-0 left-0 w-full h-96 object-cover rounded-xl opacity-30 z-0"
          />
          <div className="relative z-10">
            <div
              className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg mb-5"
              style={currentProject1.logoStyle}
            >
              <img className="w-10 h-10 shadow-sm" src={currentProject1.logo} alt="logo" />
            </div>

            <div className="flex flex-col gap-5 text-white-600">
              <p className="text-white text-2xl font-semibold animatedText">{currentProject1.title}</p>
              <p className="animatedText">{currentProject1.desc}</p>
              <p className="animatedText">{currentProject1.subdesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
