# gRPC Express

![Version badge](https://img.shields.io/badge/version-1.0.0-blue.svg)

`gRPCExpress` is a gRPC-web caching library built with TypeScript. It enhances the native functionalities of the `grpc-web` library by providing advanced caching capabilities.

## Features

- **Enhanced Caching**: Extends the grpc-web's ServiceClient class to incorporate advanced caching functionalities.
- **Efficiency**: A pub-sub pattern to sequence repetitive function calls, reducing network usage.
- **Cost-aware Caching**: An efficient algorithm that maintains cache size constraints while ensuring relevant data remains cached.
- **Unit Testing**: Tested using ViTest.

## Prerequisites

Before you begin, ensure you have the `grpc-web` dependency installed in your project and the services stub generated with protoc.

```bash
protoc -I=protos stocks.proto --js_out=import_style=commonjs,binary:protos --grpc-web_out=import_style=commonjs+dts,mode=grpcweb:protos
```

## Installation

Install the library using npm:

```bash
npm i @grpcexpress/grpcexpress
```

## Basic Usage

```typescript
import { grpcExpressClient } from "@grpcexpress/grpcexpress";
const Client = grpcExpressClient(ServiceClient);
const client = new Client(url);
const response = await client.myMethod(message);
```

## Advanced Usage

### Setting Default Cache Duration

Set default cache duration (in ms) for all method calls, the default duration is 10 minutes:

```typescript
const Client = grpcExpressClient(ServiceClient, 10000);
```

### Skipping Caching

To skip caching for a particular call:

```typescript
const response = await client.myMethod(message, {
  cacheOptions: { cache: "nocache:" },
});
```

### Custom Cache Expiration

Specify a custom cache expiration duration (in ms) for a particular response:

```typescript
const response = await client.myMethod(message, {
  cacheOptions: { duration: 10000 },
});
```

## License

This project is licensed under the MIT License.

## Credits

Junwen Zhang
Arthur Griffith
Murat Agrali
Shi Yu Liu
