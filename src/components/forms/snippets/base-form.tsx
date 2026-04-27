import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CODE_LANGUAGES } from "@/lib/schemas/snippetSchemas";
import { State } from "@/lib/types/utilities";
import { CreateForm } from "./create-form";

export default function SnippetBaseForm({
  state,
}: {
  state: State<CreateForm>;
}) {
  const codeLength = state.data?.code?.split("\n").length || 15;
  return (
    <FieldGroup>
      <Field data-invalid={state.errors?.properties?.title ? true : false}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          name="title"
          placeholder="Title of snippet"
          defaultValue={state.data?.title}
          aria-invalid={state.errors?.properties?.title ? true : false}
        />
        <FieldError>{state.errors?.properties?.title?.errors[0]}</FieldError>
      </Field>
      <Field data-invalid={state.errors?.properties?.language ? true : false}>
        <FieldLabel htmlFor="language">Language</FieldLabel>
        <Select name="language" defaultValue={state.data?.language}>
          <SelectTrigger
            className="w-full"
            aria-invalid={state.errors?.properties?.language ? true : false}
          >
            <SelectValue placeholder="Select code language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Code languages</SelectLabel>
              {CODE_LANGUAGES.map((language) => (
                <SelectItem key={language} value={language.toLowerCase()}>
                  {language}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError>{state.errors?.properties?.language?.errors[0]}</FieldError>
      </Field>
      <Field data-invalid={state.errors?.properties?.code ? true : false}>
        <FieldLabel htmlFor="code">Snippet Code</FieldLabel>
        <Textarea
          id="code"
          name="code"
          placeholder="Code of snippet"
          rows={codeLength > 15 ? codeLength : 15}
          className="font-mono"
          defaultValue={state.data?.code}
          aria-invalid={state.errors?.properties?.code ? true : false}
        />
        <FieldError>{state.errors?.properties?.code?.errors[0]}</FieldError>
      </Field>
    </FieldGroup>
  );
}
