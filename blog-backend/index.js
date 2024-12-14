import app from "./app.js";
import * as config from "./utils/config.js";

app.listen(config.PORT, () => {
  console.log(`Server running on Port ${config.PORT}`);
});
