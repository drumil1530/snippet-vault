"use client";

import { State } from "@/lib/types/action-state";
import { RegisterForm } from "./form";
import { Field, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { appRoutes } from "@/lib/routes";
import { UsernameCheckResponse } from "@/app/api/users/check-username/route";

export default function UsernameCheck({ state }: { state: State<RegisterForm> }) {
  async function checkUsername(value: string) {
    try {
      const res = await fetch(appRoutes.api.users.checkUsername(value));
      const data: UsernameCheckResponse = await res.json();

      if (data.valid) {
        if (data.available) setIsAvailable(true);
        else setIsAvailable(false);
      } else {
        setMessage(data.message);
        setIsAvailable(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  }

  const [input, setInput] = useState(state.data?.username || "");
  const [message, setMessage] = useState(
    state.errors?.properties?.username?.errors[0] || undefined,
  );
  const [isAvailable, setIsAvailable] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const [debouncedValue] = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      setIsChecking(true);
      setMessage(undefined);
      checkUsername(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <Field data-invalid={message ? true : false}>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input
        id="username"
        name="username"
        placeholder="Enter your username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-invalid={message ? true : false}
      />
      {isChecking && <p className="text-muted-foreground text-sm">Checking username...</p>}

      {!isChecking && !message && input.length >= 3 && isAvailable && (
        <p className="text-sm text-green-600">Username is available.</p>
      )}

      {!isChecking && !isAvailable && !message && (
        <p className="text-sm text-destructive">Username is already taken.</p>
      )}
      <FieldError>{message}</FieldError>
    </Field>
  );
}
