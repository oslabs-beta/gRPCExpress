import { StatusCode, RpcError } from 'grpc-web';
import { useCache, useSetCache } from '../contexts/context';

export default class UnaryInterceptor {
  intercept(request, invoker) {
    // const cache = useCache();
    // const reqMsg = request.getRequestMessage();
    // // reqMsg = user {user: 'Murat'}
    // if (cache?.[reqMsg]) {
    //   throw new RpcError(StatusCode.CANCELLED, 'Returning cache', {});
    // }

    return invoker(request).then(response => {
      // const setCache = useSetCache();
      // setCache(response);
      return response;
    });
  }
}
