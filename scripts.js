// Variável "ID" inicial dos itens da tarefa
var id = 0

// Botão "editar" da tarefa
function editar(textoAlterar) {
    // Chamando e trocando os valores do texto na aba de edição
    const inputValue = document.querySelector("#editarInput").value;
    const textoId = textoAlterar.id.replace("lapis", "texto");
    const textoTarefa = document.getElementById(textoId);

    // Aba de edição
    Swal.fire({
        title: "Altere como quiser sua tarefa",
        html: "<input value='' id='editarInput'>",
        showCancelButton: true,
        confirmButtonColor: "#215f94",
        cancelButtonColor: "#000",
        confirmButtonText: "Finalizar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            textoTarefa.innerText = inputValue
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

// Função "adicionar tarefa"
function adicionar() {
    // Somador de IDs
    id += 1

    // Selecionando o input da pessoa
    const input = document.querySelector("#input");
    const lfazer = document.querySelector("#lFazer");

    // Criando os DIVs das propriedades da linha da tarefa
    const tarefa = document.createElement("div");
    const quadrado = document.createElement("div");
    const texto = document.createElement("div");
    const lapis = document.createElement("div");
    const lixeira = document.createElement("div");

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

    // Elementos das tarefas feitas
    const quadrado = document.getElementById(checkarTarefa.id);
    const textoId = checkarTarefa.id.replace("quadrado", "texto");
    const texto = document.getElementById(textoId)
    quadrado.setAttribute("class", "fa fa-check-square");
    texto.setAttribute("class", "textoLista riscado")

    // Chamando o ID da tarefa
    const tarefaId = checkarTarefa.id.replace("quadrado", "t");
    const tarefa = document.getElementById(tarefaId);

    // Clonando a tarefa
    const tarefaCheckada = tarefa.cloneNode(true);

    // Criando a DIV onde a tarefa conclu´da ficará
    const lfeita = document.createElement("div");
    lfeita.appendChild(tarefaCheckada);

    // Atribuindo a área das tarefas feitas
    lfeita.setAttribute("class", "listaTarefas");
    lfeita.setAttribute("id", "lFeita");
    tudo.appendChild(lfeita);

    // Remover a tarefa original depois de "checkada"
    tarefa.remove()
}