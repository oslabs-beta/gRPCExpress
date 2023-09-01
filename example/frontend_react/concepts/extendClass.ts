import { StocksServiceClient } from '../protos/StocksServiceClientPb';
import * as grpcWeb from 'grpc-web';

const methods = getClassMethods(StocksServiceClient);

interface client {
  [key: string]: any;
}

class NewClient extends StocksServiceClient {
  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  ) {
    super(hostname, credentials, options);
    ``;
    for (const method of methods) {
      const thisClient: client = this;
      const oldMethod = thisClient[method];
      const newMethod = function (request: any, metadata?: any) {
        console.log('test');
        return oldMethod(request, metadata);
      };
      thisClient[method] = newMethod;
    }
  }
}

function getClassMethods(ClassObject: any) {
  return Object.getOwnPropertyNames(ClassObject.prototype).filter(
    prop => prop != 'constructor'
  );
}

const client = new NewClient('http://localhost:3000');
client.getStocks({ username: 'Jun' }, {});
// console.log(client);

// class A {
//   str: string;
//   constructor(str: string) {
//     this.str = str;
//   }
// }

// type Obj = { [key: string]: any };
// const obj: Obj = {};

// function addFuncToObj<T extends (...params: any[]) => any>(func: T) {
//   obj[func.name] = func;
// }

// function sum(a: number, b: number) {
//   return a + b;
// }

// addFuncToObj(sum);

// obj.sum(1 + 2 + 3);
