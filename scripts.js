// Variável "ID" inicial dos itens da tarefa
var id = 0

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
    
    // Analizar se "lfazer" contém a classe "oculto"
    if (lfazer.classList.contains("oculto")) {
        lfazer.classList.remove("oculto");
    }

    // Propriedade "tarefa"
    tarefa.setAttribute("class", "tarefa");
    tarefa.setAttribute("id", "t" + id);
    lfazer.appendChild(tarefa);

    // Propriedade "quadrado"
    quadrado.setAttribute("class", "fa fa-square");
    quadrado.setAttribute("id", "quadrado" + id);
    quadrado.setAttribute("onclick", "checkar(this)");
    tarefa.appendChild(quadrado);

    // Propriedade "texto"
    texto.setAttribute("class", "textoLista");
    texto.setAttribute("id", "texto" + id);
    texto.innerText = input.value;
    tarefa.appendChild(texto);

    // Propriedade "lapis"
    lapis.setAttribute("class", "fa fa-pencil-square");
    lapis.setAttribute("id", "lapis" + id);
    lapis.setAttribute("onclick", "editar(this)");
    tarefa.appendChild(lapis);

    // Propriedade "lixeira"
    lixeira.setAttribute("class", "fa fa-trash-can");
    lixeira.setAttribute("id", "apagar" + id);
    lixeira.setAttribute("onclick", "excluir(this)");
    tarefa.appendChild(lixeira);
}

// "ENTER" adiciona uma tarefa
document.getElementById("input").addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        adicionar();
    }
});

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
        cancelButtonText: "Cancelar",
        // Ao apertar "ENTER" edita a tarefa
        didOpen: () => {
            const input = document.getElementById("editarInput");
            input.focus();
            input.addEventListener("keydown", function (evento) {
                if (evento.key==="Enter") {
                    Swal.clickConfirm();
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const inputValue = document.getElementById("editarInput").value;
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
        cancelButtonText: "Cancelar",
    // Ao apertar "ENTER" edita a tarefa
    didOpen: () => {
	    const idB = button.id
            const tarefaid = idB.replace("apagar", "t");
            const tarefa = document.querySelector("#" + tarefaid);
            const input = document.getElementById("editarInput");
            input.focus();
            input.addEventListener("keydown", function (evento) {
                if (evento.key === "Enter") {
                    Swal.clickConfirm();
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const idB = button.id
            const tarefaid = idB.replace("apagar", "t");
            const tarefa = document.querySelector("#" + tarefaid)
            tarefa.remove();
        }
    });  

    // Adicionando classe "oculto" se a DIV lFazer estiver vazia
    const lfazer = document.querySelector("#lFazer");
    if(lfazer.innerHTML==="") {
        lfazer.classList.add("oculto");
    }

    // Adicionando classe "oculto" se a DIV lFeita estiver vazia
    const lfeito = document.querySelector("#lFeita");
    if(lfeito.innerHTML==="") {
        lfeito.classList.add("oculto");
    }    
}

// Função "checkar tarefa"
function checkar(checkarTarefa) {
    const quadrado = document.getElementById(checkarTarefa.id);
    const textoId = checkarTarefa.id.replace("quadrado", "texto");
    const texto = document.getElementById(textoId);
    const tarefaId = checkarTarefa.id.replace("quadrado", "t");
    const tarefa = document.getElementById(tarefaId);
    
    const lfazer = document.querySelector("#lFazer");
    const lfeita = document.querySelector("#lFeita");
    
    if (quadrado.classList.contains("fa-square")) {
        // Marcar como feita
        quadrado.classList.remove("fa-square");
        quadrado.classList.add("fa-check-square");
        texto.classList.add("riscado");
        lfeita.appendChild(tarefa);
    
        lfeita.classList.remove("oculto");
        if (lfazer.children.length === 0) lfazer.classList.add("oculto");
    } else {
        // Marcar como não feita
        quadrado.classList.remove("fa-check-square");
        quadrado.classList.add("fa-square");
        texto.classList.remove("riscado");
        lfazer.appendChild(tarefa);
    
        lfazer.classList.remove("oculto");
        if (lfeita.children.length === 0) lfeita.classList.add("oculto");
    }
}