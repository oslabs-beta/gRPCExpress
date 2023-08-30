import React, { useEffect } from 'react';

import { StatusCode, RpcError } from 'grpc-web';

import { StocksServiceClient } from '../protos/StocksServiceClientPb';
import { StocksServicePromiseClient } from '../protos/stocks_grpc_web_pb';
import { User } from '../protos/stocks_pb';

let cache = {
  test: {},
};
const StreamInterceptor = function () {};

StreamInterceptor.prototype.intercept = function (request, invoker) {
  const InterceptedStream = function (stream) {
    this.stream = stream;
  };

  InterceptedStream.prototype.on = function (eventType, callback) {
    if (eventType === 'data') {
      console.log('data', eventType);
      // Check if you have a cached response for this request
      // const cachedResponse = { stocksList: [1] }; // Implement this function
      // callback(cachedResponse);
      // this.stream.cancel();
      const newCallback = res => {
        // console.log(res.toObject());
        return res;
      };
      this.stream.on(eventType, newCallback);
      // return this; // Return early since we've handled the callback
    }
    if (eventType === 'end') {
      console.log('end');
      this.stream.on(eventType, callback);
      // this.stream.cancel();
    }

    if (eventType === 'status') {
      const newCallback = status => {
        console.log(status);
      };

      this.stream.on(eventType, callback);
    } else {
      this.stream.on(eventType, callback);
    }
    return this;
  };

  InterceptedStream.prototype.cancel = function () {
    this.stream.cancel();
    console.log('stream cancelled');
    return this;
  };

  // throw new RpcError(StatusCode.OK, 'cancelled by user', {});

  // stream.cancel();

  // console.log();
  // return stream;

  // const user = request.getMessage().getUsername();

  // if (user in cache) {
  //   stream.cancel();
  // }
  throw new RpcError(StatusCode.ABORTED, 'Aborted', {});

  return new InterceptedStream(invoker(request));
};

const UnaryInterceptor = function () {};

UnaryInterceptor.prototype.intercept = function (request, invoker) {
  console.log(invoker);
  throw new RpcError(StatusCode.ABORTED, 'Aborted', {});
  return invoker(request);
};

const client = new StocksServiceClient('http://localhost:8080', null);

const ourClient = func(constructor, url, options) {
  if ('UnaryInterceptor' in options) {
    options.UnaryInterceptor.push(interceptor)
  }
  const newOptions = {
    ...options,
    UnaryInterceptor: [interceptor]
  }
  return new constructor(url, null, newOptions)
}

const a = func(StocksServiceClient, 'http://localhost:8080', null, options)

const promiseClient = new StocksServicePromiseClient(
  'http://localhost:8080',
  null,
  {
    unaryInterceptors: [new UnaryInterceptor()],
  }
);

export default function App() {
  const user = new User();
  user.setUsername('Arthur');

  // const x = client.getStocks(user, {}, (err, res) => {
  // console.log(err);
  // console.log(res);
  // });

  // console.log('1', x);

  // x.on('status', status => {
  //   console.log(status);
  // });

  // x.on('end', () => console.log('end'));
  // x.on('error', err => console.log(err));

  // console.log(response);

  // response.on('status', status => console.log(status));
  // response.on('error', status => console.log(status));
  // response.on('end', () => console.log('end'));

  // response === undefined

  // useEffect(() => {
  //   (async () => {
  //     const res = await promiseClient.getStocks(user);
  //     console.log(res);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        // client.getStocks(user, {}, (err, res) => {
        //   console.log(err);
        //   console.log(res);
        // });
        const res = await promiseClient.getStocks(user, {});
        console.log('res', res);
      } catch (e) {
        console.log('2', e);
      }
    })();
  }, []);

  return <div>A</div>;
}

async function testGetStocks() {
  const user = new User();
  user.setUsername('Arthur');
  let x;

  const y = await new Promise((resolve, reject) =>
    client.getStocks(user, {}, (err, res) => {
      x = res;
      resolve(null);
      console.log(err);
    })
  );

  console.log('y', y);
  return x;
}

async function checkCache(fn) {
  let user;

  const response = await fn();
  // console.log(response);

  if (response) {
    return response;
  } else {
    return cache['test'];
  }
}
