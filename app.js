import { supabase } from './config.js';
import { fetchTable, insertRecord, updateRecord, deleteRecord } from './database.js';

// Elementos del DOM
const appContainer = document.getElementById('app');

// Estado de la aplicación
let currentTable = 'polizas'; // Nombre de la tabla por defecto
let records = [];

// Función para renderizar la tabla
function renderTable() {
    appContainer.innerHTML = `
        <div class="container">
            <h1>Gestión de Polizas</h1>
            
            <div class="actions">
                <button id="add-btn">Agregar Nueva Póliza</button>
                <button id="refresh-btn">Actualizar</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Tipo</th>
                        <th>Vigencia</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="records-tbody">
                    ${records.map(record => `
                        <tr data-id="${record.id}">
                            <td>${record.id}</td>
                            <td>${record.cliente}</td>
                            <td>${record.tipo}</td>
                            <td>${record.vigencia}</td>
                            <td>${record.monto}</td>
                            <td>${record.estado}</td>
                            <td>
                                <button class="edit-btn">Editar</button>
                                <button class="delete-btn">Eliminar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <!-- Modal para agregar/editar -->
        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2 id="modal-title">Agregar Nueva Póliza</h2>
                <form id="record-form">
                    <input type="hidden" id="record-id">
                    <div class="form-group">
                        <label for="cliente">Cliente:</label>
                        <input type="text" id="cliente" required>
                    </div>
                    <div class="form-group">
                        <label for="tipo">Tipo:</label>
                        <input type="text" id="tipo" required>
                    </div>
                    <div class="form-group">
                        <label for="vigencia">Vigencia:</label>
                        <input type="date" id="vigencia" required>
                    </div>
                    <div class="form-group">
                        <label for="monto">Monto:</label>
                        <input type="number" id="monto" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="estado">Estado:</label>
                        <select id="estado" required>
                            <option value="Vigente">Vigente</option>
                            <option value="Por Vencer">Por Vencer</option>
                            <option value="Vencida">Vencida</option>
                        </select>
                    </div>
                    <button type="submit" id="submit-btn">Guardar</button>
                </form>
            </div>
        </div>
    `;

    // Agregar eventos
    document.getElementById('add-btn').addEventListener('click', openModal);
    document.getElementById('refresh-btn').addEventListener('click', loadRecords);
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.getElementById('record-form').addEventListener('submit', handleSubmit);

    // Eventos para botones de editar y eliminar
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('tr').dataset.id;
            editRecord(id);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('tr').dataset.id;
            deleteRecord(id);
        });
    });
}

// Función para cargar registros
async function loadRecords() {
    records = await fetchTable(currentTable);
    renderTable();
}

// Función para abrir el modal
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-title').textContent = 'Agregar Nueva Póliza';
    document.getElementById('record-form').reset();
    document.getElementById('record-id').value = '';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Función para editar un registro
async function editRecord(id) {
    const record = records.find(r => r.id === id);
    if (!record) return;

    document.getElementById('modal-title').textContent = 'Editar Póliza';
    document.getElementById('record-id').value = record.id;
    document.getElementById('cliente').value = record.cliente;
    document.getElementById('tipo').value = record.tipo;
    document.getElementById('vigencia').value = record.vigencia;
    document.getElementById('monto').value = record.monto;
    document.getElementById('estado').value = record.estado;
    
    document.getElementById('modal').style.display = 'block';
}

// Función para manejar el envío del formulario
async function handleSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('record-id').value;
    const recordData = {
        cliente: document.getElementById('cliente').value,
        tipo: document.getElementById('tipo').value,
        vigencia: document.getElementById('vigencia').value,
        monto: parseFloat(document.getElementById('monto').value),
        estado: document.getElementById('estado').value
    };

    if (id) {
        // Actualizar registro existente
        await updateRecord(currentTable, id, recordData);
    } else {
        // Insertar nuevo registro
        await insertRecord(currentTable, recordData);
    }

    closeModal();
    loadRecords();
}

// Función para eliminar un registro
async function deleteRecord(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta póliza?')) {
        await deleteRecord(currentTable, id);
        loadRecords();
    }
}

// Inicializar la aplicación
loadRecords();
