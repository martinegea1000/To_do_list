// app.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configurar el motor de plantillas
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Listas de tareas
const generalTasks = [];
const workTasks = [];

// Ruta principal
app.get("/", (req, res) => {
    res.render("list", { listTitle: "Lista General", tasks: generalTasks });
});

// Ruta para la lista de trabajo
app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Lista de Trabajo", tasks: workTasks });
});

// Ruta para agregar tareas
app.post("/", (req, res) => {
    const task = req.body.newTask;
    const listType = req.body.list;

    if (listType === "Lista de Trabajo") {
        workTasks.push(task);
        res.redirect("/work");
    } else {
        generalTasks.push(task);
        res.redirect("/");
    }
});

// Ruta para eliminar tareas (opcional)
app.post("/delete", (req, res) => {
    // Implementación para eliminar tareas si es necesario.
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});