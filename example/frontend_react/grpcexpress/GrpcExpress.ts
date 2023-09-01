import UnaryInterceptor from './Interceptor';

class GrpcExpress {
  clients: {};
  _actualClients: {};

  constructor() {
    this.clients = {
      stocksClient: {
        getStocks(user) {
          console.log(1);
          return this._actualClients.stocksClient.getStocks(user);
        },
      },
    };
    this._actualClients = {
      stocksClient,
    };
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

    const client = new Client(url, credentials, newOptions);
    // save the client to context

    //methodDescriptorGetStocks

    console.log(client);

    localStorage.setItem('clients', JSON.stringify(this.clients));
    // add the client to clients
    this.clients['stocksClient'] = client;
  }

  async call(user) {
    console.log(1);
    return await this.clients.stocksClient.getStocks(user);
  }
}

export default GrpcExpress;
