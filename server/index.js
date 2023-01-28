// setup express server
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3001

// TESTING: send an message from server to client
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// TESTING: console log the server port #
app.listen(PORT, () => {
  console.log(`server listing on http://localhost:${PORT}`);
});
