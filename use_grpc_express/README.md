# useGrpcExpress

![Version badge](https://img.shields.io/badge/version-1.0.0-blue.svg)

`useGrpcExpress` is a custom React hook designed to integrate with `gRPCExpress`.

## Features

- **Easy Integration**: Designed to work effortlessly with `gRPCExpress` library.
- **State Management**: Provides loading, error states, response, and any potential error from the method call.

## Prerequisites

Ensure you have the following dependencies installed in your project:

- `@grpcexpress/grpcexpress`
- `grpc-web`
- `React`

## Installation

To install the `useGrpcExpress` hook, use the following npm command:

```bash
npm i @grpcexpress/usegrpcexpress
```

## Basic Usage

Incorporate the hook in your React component:

```javascript
import { useGrpcExpress } from "@grpcexpress/usegrpcexpress";

function MyComponent() {
  const { isLoading, isError, data, error } = useGrpcExpress(
    client.myMethod,
    message
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Render your data */}
      {data && <div>{data.someField}</div>}
    </div>
  );
}
```

## License

This project is licensed under the MIT License.

## Credits

Junwen Zhang
Arthur Griffith
Murat Agrali
Shi Yu Liu
