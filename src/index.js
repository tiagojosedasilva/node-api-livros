let DB_livros = [];

const express = require("express");
const req = require("express/lib/request");
const app = express();
const port = 3333;

app.use(express.json());

app.listen(port, () => {
    console.log('App is reunning!')
});

app.get("/", (req, res) => {
    return res.status(200).json(DB_livros);
});

app.get("/:livro_id", (req, res) => {
    const {livro_id} = req.params;
    const livro = DB_livros.find((livro) => livro.id === livro_id);
    return res.status(200).json(livro);
});

app.post("/", (req, res) => {
    const {id, title, author, date} = req.body;
    const livro = {id, title, author, date};
    DB_livros.push(livro);
    return res.status(200).json(DB_livros);
});

app.delete("/:livro_id", (req, res) => {
    const {livro_id} = req.params;
    const filteredLivro = DB_livros.filter(livro => livro.id !== livro_id);
    DB_livros = filteredLivro;
    return res.status(200).json("Deleted!");
});

app.patch("/:livro_id", (req, res) => {
    const {title, author, date} = req.body;
    const {livro_id} = req.params;
    const livro = DB_livros.find(livro => livro.id === livro_id);

    livro.id = livro.id;
    livro.title = title;
    livro.author = author;
    livro.date = date;

    return res.status(200).json("Updated!!")
})