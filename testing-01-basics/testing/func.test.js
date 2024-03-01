import { it, expect } from "vitest";

import {
  transformToNumber,
  validateNumber,
  validateStringNotEmpty,
} from "./func";

it("should transformToNumber correctly converts a string to a number", () => {
  const value = 64;

  const result = transformToNumber(value);

  expect(result).toBe(value);
  expect(typeof result).toBe("number");
});

it("validateNumber throws an error for invalid number input", () => {
  const invalidValue = "ini bukan nomor";

  expect(() => validateNumber(invalidValue)).toThrow("Invalid number input.");
});

it("validateNumber does not throw an error for valid number input", () => {
  const validValue = 42;

  expect(() => validateNumber(validValue)).not.toThrow();
});

it("validateStringNotEmpty throws an error for empty strings", () => {
  const emptyString = "";

  expect(() => validateStringNotEmpty(emptyString)).toThrowError(
    "Invalid input - must not be empty."
  );
});

it("validateStringNotEmpty does not throw an error for non-empty strings", () => {
  const nonEmptyString = "Hello, World!";

  expect(() => validateStringNotEmpty(nonEmptyString)).not.toThrow();
});
