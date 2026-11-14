// Supported operations: addition (+), subtraction (-), multiplication (*), division (/),
// modulo (%), and exponentiation (^).
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new RangeError('Cannot divide by zero.');
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new RangeError('Cannot modulo by zero.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new RangeError('Cannot take the square root of a negative number.');
  }

  return Math.sqrt(n);
}

function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    case '%':
      return modulo(a, b);
    case '^':
      return power(a, b);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

function runCli(args) {
  const isSquareRoot = args.length === 2 && args[0] === 'sqrt';
  if (!isSquareRoot && args.length !== 3) {
    process.stderr.write('Usage: node src/calculator.js <number> <+|-|*|/|%|^> <number> | sqrt <number>\n');
    return 1;
  }

  const [left, operator, right] = isSquareRoot ? [args[1], 'sqrt'] : args;
  if (left.trim() === '' || (!isSquareRoot && right.trim() === '')) {
    process.stderr.write('Operands must be valid numbers.\n');
    return 1;
  }

  const a = Number(left);
  const b = isSquareRoot ? undefined : Number(right);
  if (!Number.isFinite(a) || (!isSquareRoot && !Number.isFinite(b))) {
    process.stderr.write('Operands must be valid numbers.\n');
    return 1;
  }

  if (isSquareRoot && a < 0) {
    process.stderr.write('Cannot take the square root of a negative number.\n');
    return 1;
  }

  if (!isSquareRoot && !['+', '-', '*', '/', '%', '^'].includes(operator)) {
    process.stderr.write(`Unsupported operator: ${operator}\n`);
    return 1;
  }

  if (operator === '/' && b === 0) {
    process.stderr.write('Cannot divide by zero.\n');
    return 1;
  }

  if (operator === '%' && b === 0) {
    process.stderr.write('Cannot modulo by zero.\n');
    return 1;
  }

  const result = isSquareRoot ? squareRoot(a) : calculate(a, operator, b);
  process.stdout.write(`${result}\n`);
  return 0;
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };

if (require.main === module) {
  process.exitCode = runCli(process.argv.slice(2));
}
