"use client";

import { State } from "@/lib/types/action-state";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Spinner } from "@/ui/spinner";
import { Eye, EyeOff, LogInIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { login } from "../../actions/login";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";

export interface LoginForm {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const initialState: State<LoginForm> = { data: { email: "", password: "" } };
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [open, setOpen] = useState(false);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={state.errors?.properties?.email ? true : false}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            defaultValue={state.data?.email}
            aria-invalid={state.errors?.properties?.email ? true : false}
          />
          <FieldError>{state.errors?.properties?.email?.errors[0]}</FieldError>
        </Field>
        <Field data-invalid={state.errors?.properties?.password ? true : false}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              name="password"
              type={open ? "text" : "password"}
              placeholder="Enter password"
              defaultValue={state.data?.password}
              aria-invalid={state.errors?.properties?.password ? true : false}
            />
            <InputGroupAddon align="inline-end">
              <Button
                type="button"
                className="bg-transparent text-inherit"
                size="icon"
                onClick={() => setOpen(!open)}
              >
                {open ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <FieldError>{state.errors?.properties?.password?.errors[0]}</FieldError>
        </Field>
      </FieldGroup>
      {state.message && <p className="text-destructive mt-2">{state.message}</p>}
      <Button type="submit" className="mt-3" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner />
            {"Logging In"}
          </>
        ) : (
          <>
            <LogInIcon />
            {"Login"}
          </>
        )}
      </Button>
    </form>
  );
}
