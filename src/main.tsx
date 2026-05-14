import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { ColorProvider } from './useContext/colorMode/ColorProvider.tsx';
import { UserProvider } from './useContext/user/userProvider.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
    <UserProvider>
        <ColorProvider>
          <App />
        </ColorProvider>
      </UserProvider>
    </BrowserRouter>
  // </StrictMode>
  ,
)
