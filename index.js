const express = require("express") 
const app = express()
const cors = require("cors")
const pool = require("./db_config.js")


app.use(cors())
app.use(express.json())



////Routes 

// create a new employee

app.post("/api/v1/employees", async (req, res) => {
  try {
    const { firstName, lastName, emailId } = req.body
    const newEmployee = await pool.query(
      'INSERT INTO employees (firstName, lastName, emailID) VALUES($1, $2, $3) RETURNING *',
      [firstName, lastName, emailId]

    );
    res.json(newEmployee);
  } catch (err) {
    console.error(err.message);
  }
});


// get all employees

app.get("/api/v1/employees", async (req, res) => {
    try {
      const allEmployees = await pool.query("SELECT * FROM employees");
      res.json(allEmployees.rows);
    } catch (err) {
      console.error(err.message);
    }
  });



//get employee by id

app.get("/api/v1/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id
    ]);

    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete an employee 

app.delete("/api/v1/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query("DELETE FROM employees WHERE id = $1", [
      id
    ]);
    res.json("Employee was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});




app.listen(8080, () => {
    console.log("hey we did it")
})