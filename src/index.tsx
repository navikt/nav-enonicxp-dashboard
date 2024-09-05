import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { StoreProvider } from './store/Context.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoreProvider>
            <App />
        </StoreProvider>
    </StrictMode>,
);
