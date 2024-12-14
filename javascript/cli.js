let password = process.argv[2];

if (process.argv.length < 3) {
  console.log("Enter password");
}

if (password === "Hello") {
  console.log("Login ");
}
