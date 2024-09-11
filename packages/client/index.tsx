import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { StoreProvider } from './store/Context.tsx';

import './index.css';
import { BrowserRouter, Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <App />
            </StoreProvider>
        </BrowserRouter>
    </StrictMode>,
);
