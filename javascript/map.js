let animals = [
  { name: "Fluffykins", specie: "rabbit" },
  { name: "Caro", specie: "dog" },
  { name: "Hamiltions", specie: "fish" },
];

let names = animals.map(function (animal) {
  return animal.name + " is a " + animal.specie;
});
console.log(names);

// let name = [];

// for (let i = 0; i < animals.length; i++) {
//   name.push(animals[i].name, animals[i].specie);
// }

// console.log(name);
