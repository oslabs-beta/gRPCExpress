import React from 'react';
import { Stack, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import { Stock } from '../../protos/stocks_pb';

// type Responses
type Response = {
  timeSpan: number;
  symbol: string;
  name: string;
  price: number;
};

type ResponsesProps = {
  responses: Response[];
};

export default function Responses({ responses }: ResponsesProps) {
  const rows: GridRowsProp = responses.map((stock, index) => ({
    id: index,
    timeSpan: stock.timeSpan,
    symbol: stock.symbol,
    name: stock.name,
    price: stock.price.toFixed(2),
  }));

  const columns: GridColDef[] = [
    { field: 'timeSpan', headerName: 'Duration in MS', width: 150 },
    { field: 'symbol', headerName: 'Stock Symbol', width: 150 },
    { field: 'name', headerName: 'Stock Name', width: 150 },
    { field: 'price', headerName: 'Stock Price', width: 150 },
  ];

  return <DataGrid rows={rows} columns={columns} />;
}
