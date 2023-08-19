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

const todoList = [{ id: 1, task: 'hi' }];

// @ts-ignore
function getTodos(call, callback) {
  callback(null, {
    todos: todoList,
  });
}

// @ts-ignore
function addTodo(call, callback) {
  todoList.push(call.request);
  console.log(todoList);
  callback(null, {});
}

function main() {
  const server = new grpc.Server();
  // @ts-ignore
  server.addService(todo_proto.TodoApp.service, {
    getTodos,
    addTodo,
  });
  server.bindAsync(
    '0.0.0.0:3000',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
