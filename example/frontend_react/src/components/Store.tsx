import React from 'react';

type StoreProps = {
  store: { store: any[] };
};

export default function Store({ store }) {
  const storeArray = store.store as any[];

  return <div>{JSON.stringify(store.store)}</div>;
}
