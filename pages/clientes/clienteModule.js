var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var dadosFormulario = readdadosFormulario();
        if (selectedRow == null)
            insertNewClient(dadosFormulario);
        else
            updateClient(dadosFormulario);
        resetForm();
    }
}

function readdadosFormulario() {
    var dadosFormulario = {};
    dadosFormulario["name"] = document.getElementById("name").value;
    dadosFormulario["email"] = document.getElementById("email").value;
    dadosFormulario["cpf"] = document.getElementById("cpf").value;
    dadosFormulario["cidade"] = document.getElementById("cidade").value;
    return dadosFormulario;
}

function insertNewClient(data) {
    var table = document.getElementById("customerList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.cpf;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.cidade;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                       <a onClick="onDelete(this)">Deletar</a>`;
    
    saveLocalStorage(data);
}
// save in to localStorage
function saveLocalStorage(data){
    if(localStorage.getItem('clientes') == null){
        localStorage.setItem('clientes','[]');
    }
    var old_data = JSON.parse(localStorage.getItem('clientes'));
    old_data.push(data);

    localStorage.setItem('clientes',JSON.stringify(old_data));
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("cidade").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("cpf").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cidade").value = selectedRow.cells[3].innerHTML;
}
function updateClient(dadosFormulario) {
    selectedRow.cells[0].innerHTML = dadosFormulario.name;
    selectedRow.cells[1].innerHTML = dadosFormulario.email;
    selectedRow.cells[2].innerHTML = dadosFormulario.cpf;
    selectedRow.cells[3].innerHTML = dadosFormulario.cidade;
}

function onDelete(td) {
    if (confirm('Tem certeza que deseja excluir este registro ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("customerList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}

function returnMain(){
        window.location.href = '../../index.html';
    
}