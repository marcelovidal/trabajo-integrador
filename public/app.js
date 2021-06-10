// Referencia a la tabla de contenido
// Referencia al template
// const templateRow = document.getElementById('contentRow').content;
// const inputName = document.getElementById('inputName');
// const inputNameHelp = document.getElementById('inputNameHelp');
// const inputNameFormGroup = inputNameHelp.parentElement;
// const inputAge = document.getElementById('inputAge');
// const inputAgeHelp = document.getElementById('inputAgeHelp');
// const inputAgeFormGroup = inputAgeHelp.parentElement;
// const inputPassword = document.getElementById('inputPassword');
// const inputUsername = document.getElementById('inputUsername');
// // const inputUsernameHelp = document.getElementById('inputUsernameHelp');
// const inputUsernameFormGroup = inputUsernameHelp.parentElement;
// const createUserFormContent = document.getElementById('form-create');
// const createUserForm = document.getElementById('createUserForm');
// const updateUserFormContent = document.getElementById('form-update');
// const updateUserForm = document.getElementById('updateUserForm');
// let editingUserId = null;

//Tomo el template y su contenido
const contentTable = document.getElementById('contentTable');

const templateRow = document.getElementById('contentRow').content;
const inputTitulo = document.getElementById('inputTitulo');
const inputDescripcion = document.getElementById('inputDescripcion');
const inputFechaLimite = document.getElementById('inputFechaLimite');



/**
 * Agregar Row Tarea.
 *
 * @param {*} titulo
 * @param {*} descripcion
 * @param {*} id
 * @param {*} fecha_limite
 * @param {*} estado
 */
function addRow(id, titulo, descripcion) {
    // Clono el template en una nueva variable
    const row = templateRow.cloneNode(true);

    // Modifico el valor del nodo de texto por el ingesado por el usuario
    row.querySelector('.txtId').innerText = id;
    row.querySelector('.txtTitulo').innerText = titulo;
    row.querySelector('.txtDescripcion').innerText = descripcion;
    row.querySelector('.btnEdit').addEventListener('click', () => updateTask(id));
    row.querySelector('.row').dataset.id = id;

    // Inserto en el contenido de la tabla
    contentTable.appendChild(row);
}

/**
 * Llamado a la API.
 *
 * @param {'get'|'post'|'delete'|'put'} method
 * @param {'/users'|'/users/:id'} endpoint
 * @returns
 */
async function api(method, endpoint, body = undefined) {
    if (body) {
        body = JSON.stringify(body);
    }
    const headers = {
        'Content-Type': 'application/json',
    };
    const response = await fetch(`/api${endpoint}`, {
        method,
        body,
        headers,
    });
    const data = await response.json();
    return data;
}


/**
 * Cargar datos de la tabla Usuario.
 */
async function loadTable() {
    templateRow.innerHTML = '';
    const data = await api('get', '/tasks');
    data.forEach(({ id, titulo, descripcion }) => addRow(id, titulo, descripcion, ));
}

/**
 * Inicio de la APP.
 */
async function initApp() {
    await loadTable();
}

/**
 * Crear tarea.
 */
async function createTarea() {
    const titulo = inputTitulo.value;
    const descripcion = inputDescripcion.value;
    const fecha_limite = inputFechaLimite.value;

    resetFormErrors();

    const response = await api('post', '/tasks', {
        titulo,
        descripcion,
        fecha_limite,
        estado,

    });

    if (response.errors) {
        updateFormErrors(response.errors);
    } else {
        createUserForm.reset();
        loadTable();
    }
}

/**
 * Actualizar usuario.
 */
async function updateUser(id) {
    editingUserId = id;

    createUserFormContent.style.display = 'none';
    updateUserFormContent.style.display = '';

    const user = await api('get', `/users/${id}`);

    updateUserFormContent.querySelector('#user-id').innerText = id;
    updateUserForm.querySelector('#inputName').value = user.name;
    updateUserForm.querySelector('#inputAge').value = user.age;
    updateUserForm.querySelector('#inputUsername').value = user.username;
    // updateUserForm.querySelector('#inputPassword').value = user.password;
}

async function saveUpdateUser() {
    const name = updateUserForm.querySelector('#inputName').value;
    const age = updateUserForm.querySelector('#inputAge').value;
    const username = updateUserForm.querySelector('#inputUsername').value;
    // const password = updateUserForm.querySelector('#inputPassword').value;

    await api('put', `/users/${editingUserId}`, {
        name,
        age,
        username,
        password,
    });

    cancelUpdate();
    loadTable();
}

async function deleteUser(id) {
    await api('delete', `/users/${id}`);

    const userRow = document.querySelector(`[data-id='${id}']`);
    userRow.remove();
}

function cancelUpdate() {
    updateUserFormContent.style.display = 'none';
    createUserFormContent.style.display = '';
}

function updateFormErrors(errors) {
    errors.forEach((error) => {
        switch (error.field) {
            case 'name':
                inputNameHelp.innerText = error.msg;
                inputNameHelp.classList.remove('hidden');
                inputNameFormGroup.classList.add('has-error');
                break;
            case 'age':
                inputAgeHelp.innerText = error.msg;
                inputAgeHelp.classList.remove('hidden');
                inputAgeFormGroup.classList.add('has-error');
                break;
        }
    });
}

function resetFormErrors() {
    inputNameHelp.classList.add('hidden');
    inputNameFormGroup.classList.remove('has-error');
    inputAgeHelp.classList.add('hidden');
    inputAgeFormGroup.classList.remove('has-error');
}
