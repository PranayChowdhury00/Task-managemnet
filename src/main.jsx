
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your main CSS file


import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/route';
import AuthProvider from './AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast'; // Import Toaster component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster /> {/* Include Toaster here */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
