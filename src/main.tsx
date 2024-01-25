import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DialogProvider } from './ComponentContexts/DialogContext.tsx';
import { TextEntryDialogProvider } from './ComponentContexts/TextEntryDialogContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DialogProvider>
      <TextEntryDialogProvider>
        <App />
      </TextEntryDialogProvider>
    </DialogProvider>
  </React.StrictMode>
)
