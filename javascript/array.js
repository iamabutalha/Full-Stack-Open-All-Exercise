const t = [1, 2, -3];

console.log(t);

t2 = t.concat(1, 3, 4, 5);

console.log(t[1]);
console.log(t2);

t.forEach((value, index) => {
  console.log(value, index);
});

const items = ["foo", "bar", "bazz"];
let arr = ["helo"];

items.forEach((item) => {
  arr.push(item);
});

console.log(arr);

const m2 = t.map((value) => "<li>" + value + "</li>");
console.log(m2);
