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
