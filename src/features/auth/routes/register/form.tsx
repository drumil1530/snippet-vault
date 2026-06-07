"use client";

import { State } from "@/lib/types/action-state";
import { useActionState, useState } from "react";
import { register } from "../../actions/register";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Spinner } from "@/ui/spinner";
import { Eye, EyeOff, UserPlusIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";

export interface RegisterForm {
  name?: string;
  email?: string;
  password?: string;
}

export default function RegisterForm() {
  const initialState: State<RegisterForm> = { data: { name: "", email: "", password: "" } };
  const [state, formAction, isPending] = useActionState(register, initialState);
  const [open, setOpen] = useState(false);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={state.errors?.properties?.name ? true : false}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            placeholder="Username"
            defaultValue={state.data?.name}
            aria-invalid={state.errors?.properties?.name ? true : false}
          />
          <FieldError>{state.errors?.properties?.name?.errors[0]}</FieldError>
        </Field>
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
            {"Registering"}
          </>
        ) : (
          <>
            <UserPlusIcon />
            {"Register"}
          </>
        )}
      </Button>
    </form>
  );
}
