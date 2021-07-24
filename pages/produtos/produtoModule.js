var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var dadosFormulario = readdadosFormulario();
        if (selectedRow == null)
            insertNewProduct(dadosFormulario);
        else
            updateProduct(dadosFormulario);
        resetForm();
    }
}

function readdadosFormulario() {
    var dadosFormulario = {};
    dadosFormulario["name"] = document.getElementById("name").value;
    dadosFormulario["categoria"] = document.getElementById("categoria").value;
    dadosFormulario["preco"] = document.getElementById("preco").value;
    dadosFormulario["estoque"] = document.getElementById("estoque").value;
    return dadosFormulario;
}

function insertNewProduct(data) {
    var table = document.getElementById("productList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.categoria;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.preco;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.estoque;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                       <a onClick="onDelete(this)">Deletar</a>`;
    
    saveLocalStorage(data);
}

function saveLocalStorage(data){
    if(localStorage.getItem('produtos') == null){
        localStorage.setItem('produtos','[]');
    }
    var old_data = JSON.parse(localStorage.getItem('produtos'));
    old_data.push(data);

    localStorage.setItem('produtos',JSON.stringify(old_data));
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("estoque").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("categoria").value = selectedRow.cells[1].innerHTML;
    document.getElementById("preco").value = selectedRow.cells[2].innerHTML;
    document.getElementById("estoque").value = selectedRow.cells[3].innerHTML;
}
function updateProduct(dadosFormulario) {
    selectedRow.cells[0].innerHTML = dadosFormulario.name;
    selectedRow.cells[1].innerHTML = dadosFormulario.categoria;
    selectedRow.cells[2].innerHTML = dadosFormulario.preco;
    selectedRow.cells[3].innerHTML = dadosFormulario.estoque;
}

function onDelete(td) {
    if (confirm('Tem certeza que deseja excluir este registro ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("productList").deleteRow(row.rowIndex);
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