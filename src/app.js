const Express = require("express");
require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./routes/student");
const app = Express();
const port = process.env.PORT || 3050;

app.use(Express.json());
app.use(studentRouter);


app.listen(port, () => console.log(`Server is running on port ${port} 🔥`));
