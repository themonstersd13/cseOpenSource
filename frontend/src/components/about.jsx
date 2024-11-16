import React from 'react';
import '../css/about.css';
function About() {
  return (
    <>
        <div className='outerAbout'>
        <div className="about">
            <h1 className='headAbout'>About</h1>
            <p className='aboutContent'><span>
            Notes-Adda is a non-profit, open-source platform specifically created for the Computer Science and Engineering (CSE) department students at Walchand College of Engineering, Sangli. This platform aims to provide a comprehensive collection of study materials, which are shared by students for the benefit of their peers.

Code-Adda operates as an open-source service and leverages cloud-based data storage to securely host and manage PDF documents. This ensures that the study materials are easily accessible and can be conveniently shared among students.

By promoting collaborative learning and resource sharing, Code-Adda strives to enhance the educational experience for CSE students. The platform encourages students to contribute their notes, tutorials, and other academic resources, creating a rich repository of knowledge that can aid in their academic journey.
</span></p>
            </div>
        </div>
    </>
  )
}

export default About;