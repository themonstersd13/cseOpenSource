import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import AuthForm from './components/logReg';
import NavigationMenu from './components/navbar';
import About from './components/about';
import ContributionPage from './components/viewnotes';
import Mynotes from './components/my-notes';
import ParticleBackground from './components/particle';
import './index.css';

 
const container = document.getElementById('root');
const root = createRoot(container);

const routes = [
  {
    path: '/',
    element:<><NavigationMenu /><ParticleBackground /></>,
    children: [
      { 
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/notes/:currentId',
        element: <ContributionPage />,
      },
      {
        path: '/my-notes',
        element: <Mynotes />,
      },
      {
        path: '/authentication',
        element: <AuthForm />
      }
    ],
    errorElement: <NotFound />,
  }
  
];

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);