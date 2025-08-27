import { parse } from "./parse.ts";
import Todo from "./todo.ts";

const getArgs = () => (prompt() ?? "").split(" ");
const main = () => {
  const todo = new Todo();
  while (true) todo.process(parse(getArgs()));
};

main();
