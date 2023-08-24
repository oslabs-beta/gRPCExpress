import grpc = require('@grpc/grpc-js');
import loader = require('@grpc/proto-loader');
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../protos/todos.proto');

const packageDefinition = loader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const todo_proto = protoDescriptor.todos; // the package

function main() {
  //@ts-ignore
  const client = new todo_proto.TodoApp(
    'localhost:3000',
    grpc.credentials.createInsecure()
  );

  // @ts-ignore
  client.getTodos({}, function (err, response) {
    console.log(response);
  });

  client.addTodo(
    {
      id: 2,
      task: 'hello',
    },
    // @ts-ignore
    function (err, response) {}
  );
}

main();
