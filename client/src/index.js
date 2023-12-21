import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/storeConfig/store'
import { Provider } from 'react-redux'
import "./styles/style.scss"
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="437123391042-16rthbohjej7caekcv334nc8knfvc10k.apps.googleusercontent.com">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
          <Toaster position="top-right" toastOptions={{ className: 'react-hot-toast' }} />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
