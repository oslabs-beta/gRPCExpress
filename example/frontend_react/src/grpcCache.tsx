// @ts-ignore
import { RpcError, StatusCode } from 'grpc-web';
import { useCache, useSetCache } from '../contexts/context';

const call = () => {
  return client.getStocks(user);
};

async function grpcCache(call) {
  const cache = useCache();

  const response = await call(); // abort

  return cache;
}

const UnaryInterceptor = function () {};

UnaryInterceptor.prototype.intercept = function (request, invoker) {
  const setCache = useSetCache();

  setCache('test');
  if (true) {
    throw new RpcError(StatusCode.ABORTED, 'Aborted', {});
  }

  return invoker(request);
};

export default {
  grpcCache,
};
