import express from "express";

const app = express();

app.use(express.json());

const livros = [
  {id: 1, "titulo": "Senhor dos Aneis"},
  {id: 2, "titulo": "O Hobit"},
]

app.get('/', (req,res) => {
  res.status(200).send("Curso de Node");
})

app.get('/livros', (req,res) => {
  res.status(200).json(livros);
})

app.get('/livros/:id', (req, res) => {
  let id = req.params.id;
  let index = buscaLivro(id);
  res.status(200).json(livros[index]);
})

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).send('Livro foi cadastrado com sucesso');
})

app.put('/livros/:id', (req, res) => {
  let id = req.params.id;
  let index = buscaLivro(id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
})

app.delete('/livros/:id', (req, res) => {
  let {id} = req.params;
  let index = buscaLivro(id);
  livros.splice(index,1);
  res.json(`Livro ${id} removido com sucesso.`);
})

function buscaLivro(id){
  return livros.findIndex(livro => livro.id == id);
}

export default app;