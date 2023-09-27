type username = {
  username: string;
};

function greet(message: string, username: username) {
  console.log(message, username.username);
}

function extendFunction<T extends (...params: any[]) => any>(func: T) {
  return function (...args: Parameters<typeof func>): ReturnType<typeof func> {
    let response;
    try {
      response = func(...args);
    } catch (e) {
      response = 1;
    }
    return response;
  };
}

const newGreet = extendFunction(greet);

newGreet('world', { username: 'Jun' });
