const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);

  return `Sum of ${p1} and ${p2} is ${p1 + p2}`;
};

console.log(sum(50, 60));
console.log(sum("hel", "lo"));

const square = (p) => p * p;
let result = square(50);
console.log(result);

let t = [1, 2, 3];

const tSquared = t.map((p) => p * p);

console.log(tSquared);
