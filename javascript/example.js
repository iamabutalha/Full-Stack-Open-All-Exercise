let triple = function (x) {
  return x * 3;
};

let wapple = triple;

console.log(wapple(3));

let animals = [
  { name: "Fluffykins", specie: "rabbit" },
  { name: "Caro", specie: "dog" },
  { name: "Hamiltions", specie: "fish" },
];

let isDog = function (animal) {
  return animal.specie === "dog";
};

let dogs = animals.filter(isDog);
let otherAnimals = animals.filter(isDog);

console.log(dogs);
console.log(otherAnimals);

// let dogs = [];

// for (let i = 0; i < animals.length; i++) {
//   if (animals[i].specie === "dog") {
//     dogs.push(animals[i]);
//   }
// }

// console.log(dogs);
