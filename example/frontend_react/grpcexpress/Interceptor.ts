import { StatusCode, RpcError } from 'grpc-web';
import { useCache, useSetCache } from '../contexts/context';

import eventEmitter from '../concepts/eventEmitter';

export default class UnaryInterceptor {
  intercept(request, invoker) {
    const { storeKey } = request.getMetadata();

    if (eventEmitter.get(storeKey)) {
      throw new RpcError(StatusCode.CANCELLED, 'Returning cache', {});
    }

    return invoker(request).then(response => {
      eventEmitter.put(storeKey, response.getResponseMessage());
      return response;
    });
  }
}
