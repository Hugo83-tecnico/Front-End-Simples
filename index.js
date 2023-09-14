//TESTANDO REQUISIÇÕES API 

const livros = [];


//RECUPERA LISTA DE LIVROS ATRAVES DO METODO GET
async function obtemListaLivros(){
  const livrosArmazenados = document.getElementById("livrosArmazenados");
  const response = await fetch("http://localhost:8000/livros");

  if(!response.ok){
    console.log("Erro no get ");
  }

  const recebe = await response.json();
  armazenaLivrosRecebidos(recebe);

  livrosArmazenados.innerHTML += recebe.map((livro)=>{
      return `
      <li class="lista">
        <p>ID: ${livro.id}</p>
        <p>Nome: ${livro.nome}</p>
        <p>Editora: ${livro.editora}</p>
      </li>
  `
    
  }).join('');
  
};
  

//FUNCAO ARMAZENA A LISTA DE LIVROS EM ARRAY VAZIO
function armazenaLivrosRecebidos(recebe){
  for(let i = 0; i < recebe.length; i++){
     livros.push(recebe[i]);
  }

};


//FUNCAO CHAMADA PELO SUBMMIT DO FORM DO INDEX.HTML
criarLivro.addEventListener("submit", (e)=>{
  e.preventDefault();
  const nome = document.getElementById('nome');
  const editora = document.getElementById('editora');
  const body = [{
    nome: nome.value,
    editora: editora.value
  }];

  postNovoLivro(body);

});

//RECUPERA O LIVRO POR ID E APRESENTA AO USUARIO
buscarLivroPorId.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const id = document.getElementById('id');
  const livroSelecionado = document.getElementById("livroSelecionado");

  const response = await fetch(`http://localhost:8000/livros/${id.value}`);

  if(!response.ok){
    console.log("Erro no get ");
  }

  const recebe = await response.json();

  livroSelecionado.innerHTML = recebe.map((item)=> 
  {
    return `
      <li class="lista">
        <p>ID: ${item.id}</p>
        <p>Nome: ${item.nome}</p>
        <p>Editora: ${item.editora}</p>
      </li>
    `
  }).join('');
 
});

//SALVAR UM NOVO LIVRO NO BANCO DE DADOS ATRAVES DO METODO POST
async function postNovoLivro(body){

  const id = livros.length + 1;
  
  const connect = await fetch("http://localhost:8000/cadastro", {
    method:"POST",
    headers: {
      "Content-type": "application/json"
  },
    body: JSON.stringify({
      id:id,
      nome: body[0].nome,
      editora: body[0].editora,
      })
    })

};
  
//ATUALIZA OU MODIFICA LIVRO NO BANCO 
async function updateLivro(body){

  const connect = await fetch(`http://localhost:8000/update/${body[0].id}}`, {
    method:"PUT",
    headers: {
      "Content-type": 'application/json'
  },
    body: JSON.stringify({
      id:parseInt(body[0].id),
      nome: body[0].nome,
      editora: body[0].editora,
      })
    })

}

atualizaLivro.addEventListener('submit',(e)=>{
  e.preventDefault();
  const nome = document.getElementById('corrigeNome');
  const editora = document.getElementById('corrigeEditora');
  const id = document.getElementById('inseriId');

  const body = [{
    id: id.value,
    nome: nome.value,
    editora: editora.value,
  }]
  updateLivro(body);
  
});

deleteLivroPorId.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const id = document.getElementById('idDelete');
  const connect =  await fetch(`http://localhost:8000/delete/${id.value}}`, {
    method:"DELETE"
  })

  console.log(connect);

});


obtemListaLivros();
