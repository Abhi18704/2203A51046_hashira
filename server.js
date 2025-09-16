// Convert string number in given base to decimal
function convertToDecimal(value, base) {
  return parseInt(value, base);
}

// Multiply current polynomial with (x - root)
function multiplyPoly(poly, root) {
  const res = new Array(poly.length + 1).fill(0);
  for (let i = 0; i < poly.length; i++) {
    res[i] += poly[i];
    res[i + 1] -= poly[i] * root;
  }
  return res;
}

function solvePolynomial(data) {
  const n = data.keys.n;
  const k = data.keys.k;

  let roots = [];

  for (let i = 1; i <= n; i++) {
    if (!data[i]) continue;
    const base = parseInt(data[i].base);
    const value = data[i].value;
    const decimalValue = convertToDecimal(value, base);
    roots.push(decimalValue);
  }

  // Take first k roots
  let poly = [1]; // represents constant 1
  for (let i = 0; i < k; i++) {
    poly = multiplyPoly(poly, roots[i]);
  }

  return poly;
}
const fs = require("fs");

const inputFile = process.argv[2];  // node solution.js testcase2.json

if (!inputFile) {
  console.error("Please provide a JSON file. Example: node server.js testcase2.json");
  process.exit(1);
}

const jsonInput = fs.readFileSync(inputFile, "utf-8");
const data = JSON.parse(jsonInput);

const coefficients = solvePolynomial(data);

// Print first three coefficients (a,b,c) and c value
if (coefficients.length >= 3) {
  const [a, b, c] = coefficients;
  console.log("a =", a);
  console.log("b =", b);
  console.log("c =", c);
  console.log("Final c value:", c);
} else {
  console.log("Polynomial coefficients (highest degree first):");
  console.log(coefficients.join(" "));
}
