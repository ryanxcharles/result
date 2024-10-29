# @ryanxcharles/result

This repository provides a set of utility functions and types to work with
results in TypeScript. It follows the `Result` type pattern commonly seen in
languages like Rust, allowing functions to return either a successful result
(`Ok`) or an error (`Err`) without throwing exceptions. This makes error
handling more predictable and functional.

## Features

- **Result Type**: A `Result` type that represents either a success (`Ok`) or
  failure (`Err`).
- **Utility Functions**:
  - `Ok`: Creates a successful result.
  - `Err`: Creates an error result.
  - `isOk`: Type guard to check if a result is successful.
  - `isErr`: Type guard to check if a result is an error.
- **Async and Sync Result Wrappers**:
  - `asyncResult`: Wraps a promise, capturing success or error as a `Result`
    type.
  - `syncResult`: Wraps a function call, capturing success or error as a
    `Result` type.

## Installation

To use these utilities in your project, clone the repository and install the
dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Usage

Here's how you can use the `Result` type and utility functions.

### Basic Usage

```typescript
import {
  Ok,
  Err,
  isOk,
  isErr,
  asyncResult,
  syncResult,
} from "@ryanxcharles/result";

// Create a successful result
const success = Ok("Data loaded successfully");
console.log(success); // { value: 'Data loaded successfully', error: null }

// Create an error result
const error = Err("Failed to load data");
console.log(error); // { value: null, error: 'Failed to load data' }

// Checking result types
if (isOk(success)) {
  console.log("Success:", success.value);
} else if (isErr(error)) {
  console.log("Error:", error.error);
}
```

### Using `asyncResult` for Promises

Wrap a promise to handle success or error without using try-catch:

```typescript
const loadData = async () => {
  const result = await asyncResult(fetchData());
  if (isOk(result)) {
    console.log("Data:", result.value);
  } else {
    console.log("Error:", result.error);
  }
};
```

### Using `syncResult` for Function Calls

Wrap a function call to handle success or error without using try-catch:

```typescript
const calculate = (a: number, b: number) => a + b;
const result = syncResult(calculate, 1, 2);

if (isOk(result)) {
  console.log("Calculation Result:", result.value);
} else {
  console.log("Error:", result.error);
}
```

## Working with the `Result` Type

The `Result` type provides a way to return either a successful result (`Ok`) or
an error (`Err`) from a function without using exceptions. This can make
functions more predictable and help ensure that error handling is explicit.

### Defining Functions that Return a `Result` Type

To define a function that returns a `Result`, determine the types for the
success and error values and use the `Ok` and `Err` utility functions to return
results accordingly.

#### Example: Basic Function Returning a `Result` Type

Let’s create a function `parseNumber` that takes a string and tries to convert
it to a number. If the string cannot be parsed, it returns an `Err` with an
error message; otherwise, it returns an `Ok` with the parsed number.

```typescript
import { Result, Ok, Err, isOk, isErr } from "./your-module";

function parseNumber(value: string): Result<number, string> {
  const parsed = Number(value);
  if (isNaN(parsed)) {
    return Err(`"${value}" is not a valid number`);
  }
  return Ok(parsed);
}

// Usage
const result = parseNumber("42");
if (isOk(result)) {
  console.log("Parsed number:", result.value); // Output: Parsed number: 42
} else {
  console.log("Error:", result.error);
}
```

### Using `Result` for Error Handling in Asynchronous Functions

Here’s an example of an asynchronous function that fetches data and returns a
`Result` type. The function will return `Ok` with the fetched data if
successful, or `Err` with an error message if an error occurs.

```typescript
async function fetchData(url: string): Promise<Result<string, string>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return Err(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.text();
    return Ok(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Err(error.message);
    }
    return Err("An unknown error occurred");
  }
}

// Usage
const result = await fetchData("https://api.example.com/data");
if (isOk(result)) {
  console.log("Fetched data:", result.value);
} else {
  console.log("Error:", result.error);
}
```

### Propagating `Result` in a Chain of Functions

When working with multiple functions that return a `Result`, you can propagate
errors easily by returning `Err` without further processing or returning `Ok` if
all steps are successful. Here’s an example:

```typescript
function validateNumber(value: number): Result<number, string> {
  if (value < 0) {
    return Err("Number must be non-negative");
  }
  return Ok(value);
}

function doubleNumber(value: number): Result<number, string> {
  return Ok(value * 2);
}

function processNumber(value: string): Result<number, string> {
  const parsed = parseNumber(value);
  if (isErr(parsed)) return parsed;

  const validated = validateNumber(parsed.value);
  if (isErr(validated)) return validated;

  return doubleNumber(validated.value);
}

// Usage
const result = processNumber("42");
if (isOk(result)) {
  console.log("Processed number:", result.value); // Output: Processed number: 84
} else {
  console.log("Error:", result.error);
}
```

In this example:

1. `parseNumber` converts the string to a number.
2. `validateNumber` checks if the number is non-negative.
3. `doubleNumber` doubles the number if all previous steps succeeded.

Each function call checks for errors using `isErr` and returns an `Err` result
if any step fails, making error handling straightforward and eliminating the
need for exceptions.

### Summary

Using `Result` makes error handling in TypeScript more functional and explicit
by:

- Encouraging the use of `Ok` and `Err` to signal success or failure.
- Providing `isOk` and `isErr` type guards for easy inspection.
- Enabling simple propagation of errors without throwing exceptions.

This approach can make your codebase easier to understand and maintain, as
errors are handled in a predictable and consistent way.

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. To run the tests,
use the following command:

```bash
npx vitest
```

### Running Specific Tests

To run specific tests, you can use Vitest’s filtering options:

```bash
npx vitest <test-name>
```

## Contributing

Contributions are welcome! If you’d like to improve or extend this library,
please fork the repository and submit a pull request.

1. Fork the repo.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
