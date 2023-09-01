import UnaryInterceptor from './Interceptor';

class GrpcExpress {
  clients: {};

  constructor() {
    this.clients = {};
  }

  add(Client, url, credentials, options) {
    // inject the interceptor
    const interceptor = new UnaryInterceptor();
    const newOptions = options;
    if (options['unaryInterceptors']) {
      newOptions['unaryInterceptors'].push(interceptor);
    } else {
      newOptions['unaryInterceptors'] = [interceptor];
    }

    console.log(options);

    const client = new Client(url, credentials, newOptions);
    // save the client to context
    localStorage.setItem('clients', JSON.stringify(this.clients));
    // add the client to clients
    this.clients['stocksClient'] = client;
  }
}

export default GrpcExpress;
