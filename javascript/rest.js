let a, b, rest;

[a, b] = [10, 20];
console.log(a);

console.log(b);

[a, b, ...rest] = [10, 20, 30, 50];

console.log(rest);

let obj = {
  id: 1000,
  title: "hello world",
  author: "Doe",
};

// destucturing
let { id } = obj;
console.log(id);
