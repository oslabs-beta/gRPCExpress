import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { GrpcExpressProvider, useCache } from '../contexts/context';
import GrpcExpress from '../grpcexpress/GrpcExpress';
import { StocksServiceClient } from '../protos/StocksServiceClientPb';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

// const context = useCache();

// const grpcExpress = new GrpcExpress();
// grpcExpress.add(StocksServiceClient, 'http://localhost:8080');
// grpcExpress.clients.StocksService

root.render(
  // <GrpcExpressProvider client={client}>
  <App />
  // </GrpcExpressProvider>
);
