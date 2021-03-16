//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);

let id = 2;
let livros = [{
        id: 1,
        titulo: "A sociedade do anel",
        descricao: "Este é o primeiro volume da trilogia O Senhor dos Aneis",
        edicao: "1",
        autor: "J.R.R. Tolkien",
        isbn: "8595084750"
    },
    {
        id: 2,
        titulo: "As duas torres",
        descricao: "Este é o segundo volume da trilogia O Senhor dos Aneis",
        edicao: "1",
        autor: "J.R.R. Tolkien",
        isbn: "8595084769"
    }
];

app.get("/livros", (req, res, next) => {
    res.status(201).json(livros);
})

app.post("/livros", (req, res, next) => {
    const livro = {
        id: id += 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor,
        isbn: req.body.isbn
    }
    livros.push(livro)
    res.status(201).json(livros);
})

app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if(livro.id === req.body.id){
            livro.titulo = req.body.titulo,
            livro.descricao = req.body.descricao,
            livro.edicao = req.body.edicao,
            livro.autor = req.body.autor,
            livro.isbn = req.body.isbn
        }
    })
    res.status(200).json(livros);
})

app.delete('/livros/:id', (req, res, next) => {
    const idLivroDeletado = req.params.id;
    livros.forEach((livro, index) => {
        if(livro.id == idLivroDeletado) livros.splice(index, 1)
    })
    res.status(200).json(livros);
})

app.delete("/livros/", (req, res, next) => {
    livros.forEach((livro, index) => {
        if(livro.id == req.body.id) {
            const index = livros.indexOf(livro, 0)
            livros.splice(index, 1)
        }
    })
    res.status(200).json(livros);
})