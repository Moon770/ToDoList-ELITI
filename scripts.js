// Variável "ID" inicial dos itens da tarefa
var id = 0

// Botão "editar" da tarefa
function editar(textoAlterar) {
    // Chamando e trocando os valores do texto na aba de edição
    
    const textoId = textoAlterar.id.replace("lapis", "texto");
    const textoTarefa = document.getElementById(textoId);
    var textoAtual = document.getElementById(textoId).innerHTML;

    // Aba de edição
    Swal.fire({
        title: "Altere como quiser sua tarefa",
        html: "<input value='"+ textoAtual +"' id='editarInput'>",
        showCancelButton: true,
        confirmButtonColor: "#215f94",
        cancelButtonColor: "#000",
        confirmButtonText: "Finalizar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            var inputValue = document.querySelector("#editarInput").value;
            textoTarefa.innerText = inputValue;
        }
      });
}

// Botão "excluir" da tarefa
function excluir(button) {
    // Aba de exclusão
    Swal.fire({
        html: "<b>Tem certeza que quer deletar essa tarefa?</b>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff0000",
        cancelButtonColor: "#000",
        confirmButtonText: "Deletar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            const idB = button.id
            const tarefaid = idB.replace("apagar", "t");
            const tarefa = document.querySelector("#" + tarefaid)
            tarefa.remove();
        }
      });  
}

 //
 const lfazer = document.querySelector("#lFazer");
 if(lfazer.innerHTML=="") {
   lfazer.classList.add("oculto");
 }

 //
 const lfeito = document.querySelector("#lFeito");
 if(lfeito.innerHTML=="") {
   lfeito.classList.add("oculto");
 }    

// Função "adicionar tarefa"
function adicionar() {
    // Somador de IDs
    id += 1

    // Selecionando o input da pessoa
    const input = document.querySelector("#input");
    const lfazer = document.querySelector("#lFazer");

    // Criando os DIVs das propriedades da linha da tarefa
    tarefa = document.createElement("div");
    var quadrado = document.createElement("div");
    var texto = document.createElement("div");
    var lapis = document.createElement("div");
    var lixeira = document.createElement("div");
    
    // 
    if(lfazer.getElementsByClassName("oculto")){
        lfazer.classList.remove("oculto");
    }

    // Propriedade "tarefa"
    tarefa.setAttribute("class", "tarefa");
    tarefa.setAttribute("id", "t" + id);
    lfazer.appendChild(tarefa);

    // Propriedade "quadrado"
    quadrado.setAttribute("class", "fa fa-square");
    quadrado.setAttribute("id", "quadrado" + id);
    quadrado.setAttribute("onclick", "checkar(this)")
    tarefa.appendChild(quadrado);

    // Propriedade "texto"
    texto.setAttribute("class", "textoLista");
    texto.setAttribute("id", "texto" + id);
    texto.innerText = input.value;
    tarefa.appendChild(texto);

    // Propriedade "lapis"
    lapis.setAttribute("class", "fa fa-pencil-square");
    lapis.setAttribute("id", "lapis" + id);
    lapis.setAttribute("onclick", "editar(this)")
    tarefa.appendChild(lapis);

    // Propriedade "lixeira"
    lixeira.setAttribute("class", "fa fa-trash-can");
    lixeira.setAttribute("id", "apagar" + id);
    lixeira.setAttribute("onclick", "excluir(this)");
    tarefa.appendChild(lixeira);
}

// Função "checkar tarefa"
function checkar(checkarTarefa) {
    // Chamando a DIV "tudo" do HTML
    const tudo = document.querySelector("#tudo");
    const lFeita = document.querySelector("lFeita");     

    // Elementos das tarefas feitas
    var quadrado = document.getElementById(checkarTarefa.id);
    var textoId = checkarTarefa.id.replace("quadrado", "texto");
    var texto = document.getElementById(textoId)
    quadrado.setAttribute("class", "fa fa-check-square");
    texto.setAttribute("class", "textoLista riscado")

    // Chamando o ID da tarefa
    var tarefaId = checkarTarefa.id.replace("quadrado", "t");
    var tarefa = document.getElementById(tarefaId);

    // Clonando a tarefa
    var tarefaCheckada = tarefa.cloneNode(true);

    // Criando a DIV onde a tarefa concluída ficará
    const lfeita = document.createElement("div");
    lfeita.appendChild(tarefaCheckada);

    // Atribuindo a área das tarefas feitas
    lfeita.setAttribute("class", "listaTarefas");
    lfeita.setAttribute("id", "lFeita");
    tudo.appendChild(lfeita);

    lfeitoa.appendChild(tarefaCheckada);

    if(lFeita.getElementsByClassName("oculto")){
        lFeita.classList.remove("oculto");
    }

    // Remover a tarefa original depois de "checkada"
    tarefa.remove()
}