var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let connection;
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
 connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "burgers_db"
});
};

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
//use handlebars to render the main index.html with the burgers in it
app.get("/", function (req, res) {
  connection.query("SELECT * FROM burgers", function (err, results) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burgers: results });
  });
});

// Create a new burger
app.post("/api/burgers", function (req, res) {
  connection.query("INSERT INTO burgers SET ?", [req.body], function (err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new burger
    res.json(result)
  });
});

// Move/update burger once devoured
app.put("/api/burgers/:id", function (req, res) {
  connection.query("UPDATE burgers SET devoured = true WHERE id = ?", [req.params.id],
    function(err, result) {
      if (err) throw err;
      else if (result.changedRows === 0) {
        return res.status(404).end;
      }
      res.status(200).end();
    }
  )
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`)
});
