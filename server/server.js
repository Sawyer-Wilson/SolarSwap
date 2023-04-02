// start the server
const app = require("./app.js")
const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`Server listing on PORT: ${PORT}`));
