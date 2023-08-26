import React from 'react';

import { StocksServiceClient } from '../protos/StocksServiceClientPb';
import { User } from '../protos/stocks_pb';

const StreamInterceptor = function () {};

StreamInterceptor.prototype.intercept = function (request, invoker) {
  const InterceptedStream = function (stream) {
    this.stream = stream;
  };

  InterceptedStream.prototype.on = function (eventType, callback) {
    if (eventType === 'data') {
      this.stream.on(eventType, callback);
    } else {
      this.stream.on(eventType, callback);
    }
    return this;
  };

  console.log(request.getRequestMessage());
  request.getRequestMessage().setUsername('Murat');

  const stream = invoker(request);
  stream.cancel();

  return new InterceptedStream(stream);
};

const client = new StocksServiceClient('http://localhost:8080', null, {
  streamInterceptors: [new StreamInterceptor()],
});

export default function App() {
  const user = new User();
  user.setUsername('Arthur');
  client.getStocks(user, {}, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
  return <div>A</div>;
}
