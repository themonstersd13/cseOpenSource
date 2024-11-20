import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  return (
    <Particles
      options={{
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          size: {
            value: 10,
            random: true,
          },
          move: {
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
