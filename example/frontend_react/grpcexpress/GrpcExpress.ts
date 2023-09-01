import UnaryInterceptor from './Interceptor';

class GrpcExpress {
  clients: {};
  _actualClients: {};

  constructor() {
    this.clients = {
      // stocksClient: {
      //   getStocks(user) {
      //     console.log(1);
      //     return this._actualClients.stocksClient.getStocks(user);
      //   },
      // },
    };
    // this._actualClients = {
    //   stocksClient,
    // };
  }

  add(Client, url, credentials, options) {
    class NewStocksClient extends Client {
      constructor(url, credentials, options) {
        super(url, credentials, options);
      }
      // !todo override the old method instead of creating a new one
      // how to add context
      newGetStocks(request, metadata) {
        console.log('request', request.toObject());
        console.log(request);
        try {
          return this.getStocks(request, metadata);
        } catch (e) {
          return localStorage.getItem(JSON.stringify(request.toObject()));
        }
      }
    }
    // inject the interceptor
    const interceptor = new UnaryInterceptor();
    const newOptions = options;
    if (options['unaryInterceptors']) {
      newOptions['unaryInterceptors'].push(interceptor);
    } else {
      newOptions['unaryInterceptors'] = [interceptor];
    }

    const client = new NewStocksClient(url, credentials, newOptions);
    // save the client to context

    //methodDescriptorGetStocks

    // console.log(client);

    localStorage.setItem('clients', JSON.stringify(this.clients));
    // add the client to clients
    this.clients['stocksClient'] = client;
  }

  // async call(user) {
  //   console.log(1);
  //   return await this.clients.stocksClient.getStocks(user);
  // }
}

export default GrpcExpress;
