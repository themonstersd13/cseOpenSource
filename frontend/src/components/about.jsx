import React from 'react';

function About() {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-700 min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="bg-white border-2 border-blue-300 p-6 sm:p-8 rounded-lg w-full sm:w-[600px] md:w-[700px] lg:w-[800px] bg-opacity-90">
            <h1 className="text-center text-xl sm:text-2xl font-semibold text-blue-800 mb-4">About</h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                <span>
                    Notes-Adda is a non-profit, open-source platform specifically created for the Computer Science and Engineering (CSE) department students at Walchand College of Engineering, Sangli. This platform aims to provide a comprehensive collection of study materials, which are shared by students for the benefit of their peers.

                    Code-Adda operates as an open-source service and leverages cloud-based data storage to securely host and manage PDF documents. This ensures that the study materials are easily accessible and can be conveniently shared among students.

                    By promoting collaborative learning and resource sharing, Code-Adda strives to enhance the educational experience for CSE students. The platform encourages students to contribute their notes, tutorials, and other academic resources, creating a rich repository of knowledge that can aid in their academic journey.
                </span>
            </p>
        </div>
    </div>
  );
}

export default About;
