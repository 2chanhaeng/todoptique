import {
  argument,
  command,
  constant,
  type InferValue,
  multiple,
  object,
  or,
} from "@optique/core/parser";
import { integer, string } from "@optique/core/valueparser";
import { run } from "@optique/run";

const parser = or(
  command(
    "check",
    object({
      type: constant("check"),
      ids: multiple(argument(integer())),
    }),
  ),
  command(
    "print",
    object({
      type: constant("print"),
    }),
  ),
  command(
    "help",
    object({
      type: constant("help"),
    }),
  ),
  command(
    "quit",
    object({
      type: constant("quit"),
    }),
  ),
  object({
    type: constant("add"),
    title: multiple(argument(string())),
  }),
);

export type Commands = InferValue<typeof parser>;
export const parse = (args: string[]) => run(parser, { args });
