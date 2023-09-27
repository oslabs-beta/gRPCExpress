import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <CssBaseline>
    <Layout>
      <App />
    </Layout>
  </CssBaseline>
);
