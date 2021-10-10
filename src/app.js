const Express = require("express");
require("./db/conn");
const Student = require("./models/students");

const app = Express();
const port = process.env.PORT || 3050;

app.use(Express.json());

//! Create a new Student
// ----------------------
//todo::: using promises
// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//save the document data in database
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
// });
// promises end ----------

//todo::: using async fn---------
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// !===============================================================
// Show Student Data->
app.get("/students", async (req, res) => {
  try {
    const showData = await Student.find();
    res.send(showData);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// !===============================================================
// To show individual student data->

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const singleStudent = await Student.findById({ _id });

    if (!singleStudent) {
      return res.status(404).send();
    } else {
      res.send(singleStudent);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// !===============================================================
// To DELETE individual student data->
app.delete("/students/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deleteStudent) {
      return res.status(500).send();
    } else res.send(deleteStudent);
  } catch (error) {
    res.status(404).send(error);
  }
});

// !===============================================================
// To UPDATE individual student data->
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,                                                                //Shows instantly updated data
    });
    res.send(updateStudent);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port} 🔥`));
