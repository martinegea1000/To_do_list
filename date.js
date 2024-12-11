// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// date.js

exports.getDate = function() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
};

// Initialize app
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Data storage using Maps
const items = new Map();
const workItems = new Map();

// Seed initial data
items.set("1", "Buy Food");
items.set("2", "Cook Food");
items.set("3", "Eat Food");

// Root route (Main List)
app.get("/", (req, res) => {
  const day = date.getDate();
  const itemList = Array.from(items, ([uid, text]) => ({ uid, text }));
  res.render("list", { listTitle: day, newListItems: itemList });
});

// Work List route
app.get("/work", (req, res) => {
  const itemList = Array.from(workItems, ([uid, text]) => ({ uid, text }));
  res.render("list", { listTitle: "Work List", newListItems: itemList });
});

// Add new item
app.post("/", (req, res) => {
  const itemText = req.body.newItem;
  const listName = req.body.listName;
  const uid = Date.now().toString(); // Unique ID

  if (listName === "Work") {
    workItems.set(uid, itemText);
    res.redirect("/work");
  } else {
    items.set(uid, itemText);
    res.redirect("/");
  }
});

// Delete an item
app.post("/delete", (req, res) => {
  const uidToDelete = req.body.uid;
  const listName = req.body.listName;

  if (listName === "Work") {
    workItems.delete(uidToDelete);
    res.redirect("/work");
  } else {
    items.delete(uidToDelete);
    res.redirect("/");
  }
});

// About route
app.get("/about", (req, res) => {
  res.render("about");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});