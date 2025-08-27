import type { Commands } from "./parser.ts";

export default class Todo {
  #list = new Map<number, { title: string; checked: boolean }>();
  #nextId = 1;
  constructor() {
    this.#print();
  }
  #add(title: string) {
    this.#list.set(this.#nextId++, { title, checked: false });
    console.log(
      `${this.#nextId - 1}. [ ] ${this.#list.get(this.#nextId - 1)!.title}`,
    );
    this.#print();
  }
  #check(ids: readonly number[]) {
    ids.forEach((id) =>
      this.#list.get(id) && (this.#list.get(id)!.checked = true)
    );
    this.#print();
  }
  #help() {
    this.#print();
    console.log("Available commands:");
    console.log(" - <title: string>: Add a new todo");
    console.log(" - check <ids: number[]>: Check a todo");
    console.log(" - print: Print the todo list");
    console.log(" - quit: Quit the application");
  }
  #print() {
    console.clear();
    console.log("Todo List");
    console.log("---------");
    this.#list.forEach((item, id) => {
      console.log(`${id}. [${item.checked ? "x" : " "}] ${item.title}`);
    });
  }
  #process(result: Commands) {
    switch (result.type) {
      case "add":
        this.#add(result.title.join(" "));
        break;
      case "check":
        this.#check(result.ids);
        break;
      case "help":
        this.#help();
        break;
      case "print":
        this.#print();
        break;
      case "quit":
        Deno.exit(0);
    }
  }
  process = this.#process.bind(this);
}
