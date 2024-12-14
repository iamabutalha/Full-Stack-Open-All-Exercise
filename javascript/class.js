class Person {
  #name;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hello My name is ${this.name},  my age is ${this.age}`);
  }
}

const talha = new Person("Talha", 19);
talha.greet();
