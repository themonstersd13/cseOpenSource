import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/app';
import Home from './components/Home';
import NotFound from './components/NotFound';
import TestDiv from './components/testDiv';
import FileUpload from './components/testFileUpload';
import AuthForm from './components/logReg';
import NavigationMenu from './components/navbar';

const container = document.getElementById('root');
const root = createRoot(container);

const routes = [
  {
    path: '/',
    element:<div><NavigationMenu /> <App /></div>,
    children: [
      { path: '/', element: <div><NavigationMenu /> <Home /></div>},
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/notes/:currentId',
    element: <TestDiv />,
  },
  {
    path: '/test-file-upload',
    element: <FileUpload />
  },
  {
    path: '/authentication',
    element: <AuthForm />
  }
];

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);