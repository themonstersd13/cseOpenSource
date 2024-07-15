import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/app';
import Home from './components/Home';
import NotFound from './components/NotFound';
import TestDiv from './components/testDiv';
import FileUpload from './components/testFileUpload';

const container = document.getElementById('root');
const root = createRoot(container);

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
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
  }
];

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
