import { Fragment } from "react";
import { Trash } from "lucide-react";
import { Control, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { RenderFormField } from "./render-form-field";

type ItemFieldProps = {
  fields: Record<"id", string>[];
  control: Control<FieldValues> | undefined;
  remove: (index: number) => void;
  disabled?: boolean;
};

export const ItemsFields = ({
  fields,
  control,
  remove,
  disabled,
}: ItemFieldProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
      {fields.map((_, index) => (
        <Fragment key={index}>
          <div className="col-span-2">
            <RenderFormField
              name={`Items[${index}].name`}
              control={control}
              label="Item Name"
              placeholder="Item name"
              disabled={disabled}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <RenderFormField
              name={`Items[${index}].quantity`}
              control={control}
              label="Quantity"
              placeholder="Quantity"
              type="number"
              disabled={disabled}
            />
          </div>
          <RenderFormField
            name={`Items[${index}].price`}
            control={control}
            label="Price"
            placeholder="Price"
            type="number"
            disabled={disabled}
          />
          <div className="flex justify-end items-end">
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="outline"
              className="bg-red-500 text-white"
              disabled={disabled}
            >
              <Trash className="size-3" />
            </Button>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
