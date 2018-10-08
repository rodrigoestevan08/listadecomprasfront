const inputs = document.querySelectorAll('section input');

function atualizar(){
  fetch("https://github.com/rodrigoestevan08/listadecompras1.git/produtos").then(resposta => resposta.json()).then(dados => construirLista(dados.produtos)).catch(erro => console.log(`ERRO: ${erro}`));
}

function removerItem(event){
  fetch(`https://github.com/rodrigoestevan08/listadecompras1.git/produto/${event.target.id}`, {
    method: "DELETE"
  }).then(resposta => resposta.json()).then(dados => {
    console.log(dados);
    atualizar();
  }).catch(erro => console.log(`ERRO: ${erro}`));
}

function construirLista(listaDeProdutos){
  let lista = document.createElement('ul');

  for(let produto of listaDeProdutos){
    let item = document.createElement('li');
    let texto = document.createElement('p');
    let botao = document.createElement('button');

    texto.innerHTML = `${produto.quantidade} - ${produto.nome} - ${produto.marca}`;
    botao.innerHTML = "Remover";
    botao.id = produto._id;
    botao.onclick = removerItem;

    item.appendChild(texto);
    item.appendChild(botao);

    lista.appendChild(item);
  }

  document.querySelector('#lista').innerHTML = "";
  document.querySelector('#lista').appendChild(lista);
}

document.querySelector('button').onclick = function(event){
  if(!inputs[0].value || !Number(inputs[2].value)){
    alert("Preencha nome e quantidade");
    return;
  }

  const novoProduto = {
    nome: inputs[0].value,
    marca: inputs[1].value,
    quantidade: Number(inputs[2].value)
  }

  fetch('https://github.com/rodrigoestevan08/listadecompras1.git/produto/novo', {
    method: "POST",
    body: JSON.stringify(novoProduto),
    headers:{
      "Content-Type": "application/json"
    }
  }).then(resposta => resposta.json()).then(dados => {
    console.log(dados);
    atualizar();
  }).catch(erro => console.log(`ERRO: ${erro}`));
}

atualizar();