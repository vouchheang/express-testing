const pool = require("../config/db");

//Get all
const Getalldata = async (req, res) => {
  const selectQuery = "SELECT * FROM ToDo";

  try {
    const result = await pool.query(selectQuery);

    res.status(200).json({
      message: "Data fetched successfully",
      data: result.rows,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//Post
const Postalldata = async (req, res) => {
  const { task, complete } = req.body;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ToDo (
      id SERIAL PRIMARY KEY,
      Task TEXT NOT NULL,
      Complete BOOLEAN NOT NULL
    )
  `;

  const insertQuery = `
    INSERT INTO ToDo (Task, Complete)
    VALUES ($1, $2) RETURNING id, Task, Complete
  `;

  try {
    await pool.query(createTableQuery);
    const result = await pool.query(insertQuery, [task, complete]);

    res.status(201).json({
      message: "Task created successfully",
      task: result.rows,
    });
  } catch (err) {
    console.error("Error inserting task:", err);
    res.status(500).send("Server error");
  }
};

//Update
const Putalldata = async (req, res) => {
  const { id } = req.params;
  const { task, complete } = req.body;

  const updateQuery = `
    UPDATE ToDo
    SET Task = $1, Complete = $2
    WHERE id = $3
    RETURNING id, Task, Complete
  `;

  try {
    const result = await pool.query(updateQuery, [task, complete, id]);
    res.status(200).json({
      message: "Task updated successfully",
      task: result.rows,
    });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete
const Deletealldata = async (req, res) => {
  const { id } = req.params;

  const deleteQuery = `
    DELETE FROM ToDo
    WHERE id = $1
    RETURNING id
  `;

  try {
    const result = await pool.query(deleteQuery, [id]);

    res.status(200).json({
      message: "Task deleted successfully",
      id: result.rows,
    });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { Getalldata, Postalldata, Putalldata, Deletealldata };
