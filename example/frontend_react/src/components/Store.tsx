import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

type StoreProps = {
  store: { store: any[] };
};

export default function Store({ store }) {
  const storeArray = store.store as Record<string, any>;

  if (!storeArray) return null;

  const array: any[] = [];

  storeArray.forEach((v, k) =>
    array.push(
      <List key={k}>
        <ListItem>
          <ListItemText primary={`${v.buffer.toString().slice(0, 30)}...`} />
        </ListItem>
      </List>
    )
  );

  return <>{array}</>;
}
