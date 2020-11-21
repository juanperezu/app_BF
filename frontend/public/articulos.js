document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getTodos')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id,precio) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
    document.querySelector('#update-precio-input').dataset.precio =precio;
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');
    const updatePrecioInput = document.querySelector('#update-precio-input');


    console.log(updateNameInput,updatePrecioInput);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value,
            precio: updatePrecioInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}


const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const precioInput = document.querySelector('#precio-input');
    const descripcion = nameInput.value;
    const precio =precioInput.value;
    nameInput.value = "";
    precioInput.value ="";

    fetch('http://localhost:5000/nuevo-articulo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ descripcion : descripcion,precio:precio})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'fecha_ingreso') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.codigo}>Borrar</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.codigo}>Editar</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No hay datos</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({codigo, descripcion, precio, fecha_ingreso}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${codigo}</td>`;
        tableHtml += `<td>${descripcion}</td>`;
        tableHtml += `<td>${precio}</td>`;
        tableHtml += `<td>${new Date(fecha_ingreso).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${codigo}>Borrar</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${codigo}>Editar</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}