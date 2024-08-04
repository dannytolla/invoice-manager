import { z } from "zod";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useFieldArray } from "react-hook-form";
import { useForm, Controller, Control } from "react-hook-form";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ItemsFields } from "./items-fields";
import { RenderFormField } from "./render-form-field";

const formSchema = z.object({
  dueDate: z.coerce.date(),
  invoiceNumber: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  city: z.string(),
  Items: z.array(
    z.object({
      name: z.string(),
      quantity: z.string(),
      price: z.string(),
    })
  ),
  description: z.string().nullable().optional(),
});

type InvoiceFormProps = {
  id?: string;
  onSubmit: (values: FieldValues) => void;
  defaultValues?: FieldValues;
  onDelete?: () => void;
  disabled?: boolean;
};

export const InvoiceForm = ({
  id,
  onSubmit,
  onDelete,
  disabled,
  defaultValues,
}: InvoiceFormProps) => {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "Items",
    control: form.control,
  });

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoCapitalize="off"
        autoComplete="off"
        className="space-y-1"
      >
        <label htmlFor="" className="text-xl font-light">
          Bill to
        </label>
        <RenderFormField
          name="clientName"
          control={form.control}
          label="Name"
          placeholder="Add client's name"
          disabled={disabled}
        />
        <RenderFormField
          name="clientEmail"
          control={form.control}
          label="Email"
          placeholder="Add client's email"
          disabled={disabled}
        />
        <RenderFormField
          name="description"
          control={form.control}
          label="Description"
          placeholder="Add description"
          disabled={disabled}
        />
        <RenderFormField
          name="city"
          control={form.control}
          label="City"
          placeholder="Add client's city"
          disabled={disabled}
        />
        <RenderFormField
          name="invoiceNumber"
          control={form.control}
          label="Invoice Number"
          placeholder="Add invoice number"
          disabled={disabled}
        />
        <Controller
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Due Date</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <label htmlFor="" className="text-xl font-light mt-10">
          Item List
        </label>
        <ItemsFields
          fields={fields}
          control={form.control}
          remove={remove}
          disabled={disabled}
        />
        <br />
        <Button
          className="w-full rounded-2xl border-black"
          type="button"
          variant="outline"
          onClick={() => append({})}
          disabled={disabled}
        >
          + Add Item
        </Button>
        <br />
        <div className="flex justify-end">
          <Button disabled={disabled}>
            {id ? "Save changes" : "Create invoice"}
          </Button>
        </div>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="mr-2 size-4" />
            Delete Invoice
          </Button>
        )}
      </form>
    </Form>
  );
};
