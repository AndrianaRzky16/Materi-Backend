import Express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = Express();

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected " + process.env.DB_DATABASE);
});

// db.query("SELECT * FROM provinces limit 10", (err, rows) => {
//   if (err) throw err;
//   console.log(rows);
// });

app.get("/provinces", (req, res) => {
  db.query("SELECT * FROM provinces", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// app.get("/provinces/:provinceId/regencies", (req, res) => {
//   let provinceId = req.params.provinceId;
//   db.query(
//     `SELECT * FROM regencies WHERE province_id = ?`,
//     [provinceId],
//     (err, rows) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ error: "An error occurred while fetching the data." });
//       }
//       if (!rows || !rows.length) {
//         return res
//           .status(404)
//           .json({ message: "No regencies found for the given province." });
//       }
//       res.send(rows);
//     }
//   );
// });

app.get("/provinces/:provinceId/regencies", (req, res) => {
  let provinceId = req.params.provinceId;
  db.query(
    `SELECT provinces.name AS provinceName, regencies.name AS regencyName FROM provinces INNER JOIN regencies ON provinces.id = regencies.province_id WHERE provinces.id = ?`,
    [provinceId],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "An error occurred while fetching the data." });
      }
      if (!rows || !rows.length) {
        return res
          .status(404)
          .json({ message: "No regencies found for the given province." });
      }
      res.send(rows);
    }
  );
});

app.get("/provinces/:id", (req, res) => {
  const id = req.params.id;
  const query = `select * from provinces where id = ${id}`;

  db.query(query, (err, rows) => {
    if (err) throw err;

    if (0 === rows.length) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(rows[0]);
  });
});

app.post("/provinces", (req, res) => {
  let provinceId = req.body.id;
  let provinceName = req.body.name;
  let query = `INSERT INTO provinces (id, name) VALUES (${provinceId}, '${provinceName}')`;
  db.query(query, function (err, results) {
    if (err) {
      return res.status(500).json({ error: "Duplicate Entry." });
    }
    res.json({ message: "Berhasil menambahkan data" });
  });
});

app.put("/provinces/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const query = `UPDATE provinces SET name='${changes.name}' WHERE id=${id}`;
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error updating data" });
    } else if (result.affectedRows > 0) {
      return res.json({ message: "Successfully updated data" });
    } else {
      return res
        .status(404)
        .json({ message: "No data with that ID was found in the database." });
    }
  });
});

export default app;
