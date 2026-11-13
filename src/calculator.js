// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
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
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

function runCli(args) {
  if (args.length !== 3) {
    process.stderr.write('Usage: node src/calculator.js <number> <+|-|*|/> <number>\n');
    return 1;
  }

  const [left, operator, right] = args;
  if (left.trim() === '' || right.trim() === '') {
    process.stderr.write('Operands must be valid numbers.\n');
    return 1;
  }

  const a = Number(left);
  const b = Number(right);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    process.stderr.write('Operands must be valid numbers.\n');
    return 1;
  }

  if (!['+', '-', '*', '/'].includes(operator)) {
    process.stderr.write(`Unsupported operator: ${operator}\n`);
    return 1;
  }

  if (operator === '/' && b === 0) {
    process.stderr.write('Cannot divide by zero.\n');
    return 1;
  }

  process.stdout.write(`${calculate(a, operator, b)}\n`);
  return 0;
}

module.exports = { add, subtract, multiply, divide, calculate };

if (require.main === module) {
  process.exitCode = runCli(process.argv.slice(2));
}
