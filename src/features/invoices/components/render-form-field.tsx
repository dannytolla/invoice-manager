import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues } from "react-hook-form";

type RenderFormFieldProps = {
  name: string;
  control: Control<FieldValues> | undefined;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
};

export const RenderFormField = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
  disabled,
}: RenderFormFieldProps) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
