const obj1 = {
  name: "Arto Hellas",
  age: 35,
  education: "PHD",
};
const object2 = {
  name: "Full Stack web development",
  level: "intermidate Studies",
  size: 5,
};
const object3 = {
  name: {
    first: "Dan",
    last: "Abramavo",
  },
  grades: [2, 3, 5, 3],
  department: "Standford University",
};
obj1["address"] = "Helsenki";

console.log(obj1.name);
console.log(object3.name.first);

object3.grades.forEach((grade) => {
  console.log(grade);
});

console.log(object3["name"]["last"]);
console.log(obj1["address"]);

const arto = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",

  greet: function () {
    console.log(`Greeting ${this.name}`);
  },

  doAddition: function (a, b) {
    console.log(a + b);
  },
};

arto.greet();

arto.getOlder = function () {
  this.age += 1;
  console.log(`${this.name} your age is ${this.age}`);
};

arto.getOlder();
arto.getOlder();

const refrenceAddition = arto.doAddition;

refrenceAddition(98, 788);

setTimeout(() => {
  arto.greet.bind(arto);
}, 2000);
