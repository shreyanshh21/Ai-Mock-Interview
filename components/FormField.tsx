import React from "react"
import {
  Controller,
  Control,
  FieldValues,
  Path,
} from "react-hook-form"
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  type?: "text" | "email" | "password" | "file"
  description?: string
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {/* ✅ Fixed label style */}
          <FormLabel className="block text-sm font-medium text-gray-700">
            {label}
          </FormLabel>

          <FormControl>
            {type === "file" ? (
              // ✅ Special handling for file inputs
              <Input
                type="file"
                placeholder={placeholder}
                onChange={(e) =>
                  field.onChange(e.target.files ? e.target.files[0] : null)
                }
              />
            ) : (
              // ✅ Normal text/email/password input
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormField
