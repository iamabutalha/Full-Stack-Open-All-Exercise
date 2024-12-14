const fs = require("fs");
{
  mark_Johansson: [
    { name: "waffle", price: "80", quantity: "2" },
    { name: "blender", price: "200", quantity: "1" },
    { name: "knife", price: "10", quantity: "4" },
  ];
  Nikitta_smith: [
    { name: "waffle iron", price: "80", quantity: "1" },
    { name: "knife", price: "10", quantity: "2" },
    { name: "pot", price: "20", quantity: "3" },
  ];
}

let output = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split("\t"));
console.log(output);
