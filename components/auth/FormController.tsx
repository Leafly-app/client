import React from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import type { TextInputProps } from "react-native";
import AuthInput from "./AuthInput";

interface FormControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
}

export function FormController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}: FormControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <AuthInput
          label={label}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error}
        />
      )}
    />
  );
}
