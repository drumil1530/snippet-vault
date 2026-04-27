import { $ZodErrorTree } from "zod/v4/core";

export interface State<T> {
  errors?: $ZodErrorTree<T>;
  message?: string;
  data?: T;
}
