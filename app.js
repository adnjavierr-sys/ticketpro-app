// app.js - Versión mejorada para guardar cambios
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Iniciando aplicación...');
        initApp();
    });

    function initApp() {
        console.log('📋 Inicializando aplicación...');
        setupNavigation();
        loadInitialData();
        setupForms();
        cargarClientesEnSelects();
        initCharts();
    }

    function setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
                
                const pageId = this.getAttribute('data-page') + '-page';
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.style.display = 'block';
                }
                
                if (this.getAttribute('data-page') === 'agentes') {
                    initAgentCharts();
                } else if (this.getAttribute('data-page') === 'dashboard') {
                    initCharts();
                }
            });
        });
    }

    document.getElementById('toggleSidebar')?.addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });

    async function loadInitialData() {
        console.log('📊 Cargando datos iniciales...');
        try {
            await cargarTickets();
            await cargarClientes();
            await cargarAgentes();
            await cargarPolizas();
            console.log('✅ Datos iniciales cargados');
        } catch (error) {
            console.error('❌ Error al cargar datos iniciales:', error);
            showNotification('Error al cargar los datos', 'danger');
        }
    }

    function setupForms() {
        // Configurar manejadores de eventos para todos los formularios
        setupTicketForm();
        setupClienteForm();
        setupAgenteForm();
        setupPolizaForm();
    }

    function setupTicketForm() {
        const form = document.getElementById('ticketForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('🎫 Enviando formulario de ticket...');
            
            const ticketData = {
                titulo: form.querySelector('input[type="text"]').value.trim(),
                cliente_id: form.querySelector('#clienteSelect')?.value || null,
                categoria: form.querySelectorAll('select')[1]?.value || 'soporte',
                estado: 'Abierto',
                prioridad: form.querySelectorAll('select')[2]?.value || 'media',
                agente_id: form.querySelector('#agenteSelect')?.value || null,
                descripcion: form.querySelector('textarea')?.value.trim() || ''
            };
            
            // Validación
            if (!ticketData.titulo) {
                showNotification('El título es requerido', 'warning');
                return;
            }
            
            try {
                console.log('Guardando ticket...', ticketData);
                const savedTicket = await createTicket(ticketData);
                
                if (savedTicket) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('ticketModal'));
                    if (modal) modal.hide();
                    form.reset();
                    await cargarTickets();
                    showNotification('Ticket guardado exitosamente', 'success');
                    console.log('✅ Ticket guardado:', savedTicket);
                }
            } catch (error) {
                console.error('❌ Error al guardar ticket:', error);
                showNotification(`Error al guardar ticket: ${error.message}`, 'danger');
            }
        });
    }

    function setupClienteForm() {
        const form = document.getElementById('clienteForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('🏢 Enviando formulario de cliente...');
            
            const clienteData = {
                empresa: form.querySelectorAll('input[type="text"]')[0]?.value.trim() || '',
                contacto: form.querySelectorAll('input[type="text"]')[1]?.value.trim() || '',
                email: form.querySelectorAll('input[type="email"]')[0]?.value.trim() || '',
                telefono: form.querySelectorAll('input[type="text"]')[2]?.value.trim() || '',
                direccion: form.querySelector('textarea')?.value.trim() || ''
            };
            
            // Validación
            if (!clienteData.empresa) {
                showNotification('La empresa es requerida', 'warning');
                return;
            }
            
            if (!clienteData.email) {
                showNotification('El email es requerido', 'warning');
                return;
            }
            
            try {
                console.log('Guardando cliente...', clienteData);
                const savedCliente = await createCliente(clienteData);
                
                if (savedCliente) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('clienteModal'));
                    if (modal) modal.hide();
                    form.reset();
                    await cargarClientes();
                    await cargarClientesEnSelects();
                    showNotification('Cliente guardado exitosamente', 'success');
                    console.log('✅ Cliente guardado:', savedCliente);
                }
            } catch (error) {
                console.error('❌ Error al guardar cliente:', error);
                showNotification(`Error al guardar cliente: ${error.message}`, 'danger');
            }
        });
    }

    function setupAgenteForm() {
        const form = document.getElementById('agenteForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('👥 Enviando formulario de agente...');
            
            const agenteData = {
                nombre: form.querySelectorAll('input[type="text"]')[0]?.value.trim() || '',
                email: form.querySelectorAll('input[type="email"]')[0]?.value.trim() || '',
                telefono: form.querySelectorAll('input[type="text"]')[1]?.value.trim() || '',
                rol: form.querySelectorAll('select')[0]?.value || 'agente',
                especialidad: form.querySelectorAll('select')[1]?.value || 'general',
                estado: 'Offline'
            };
            
            // Validación
            if (!agenteData.nombre) {
                showNotification('El nombre es requerido', 'warning');
                return;
            }
            
            if (!agenteData.email) {
                showNotification('El email es requerido', 'warning');
                return;
            }
            
            try {
                console.log('Guardando agente...', agenteData);
                const savedAgente = await createAgente(agenteData);
                
                if (savedAgente) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('agenteModal'));
                    if (modal) modal.hide();
                    form.reset();
                    await cargarAgentes();
                    await cargarClientesEnSelects();
                    showNotification('Agente guardado exitosamente', 'success');
                    console.log('✅ Agente guardado:', savedAgente);
                }
            } catch (error) {
                console.error('❌ Error al guardar agente:', error);
                showNotification(`Error al guardar agente: ${error.message}`, 'danger');
            }
        });
    }

    function setupPolizaForm() {
        const form = document.getElementById('polizaForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('📋 Enviando formulario de póliza...');
            
            const polizaData = {
                cliente_id: form.querySelector('#polizaClienteSelect')?.value || null,
                tipo: form.querySelectorAll('select')[1]?.value || 'tecnologia',
                vigencia_inicio: form.querySelectorAll('input[type="date"]')[0]?.value || '',
                vigencia_fin: form.querySelectorAll('input[type="date"]')[1]?.value || '',
                monto: parseFloat(form.querySelector('input[type="number"]')?.value || 0),
                estado: 'Vigente'
            };
            
            // Validación
            if (!polizaData.cliente_id) {
                showNotification('El cliente es requerido', 'warning');
                return;
            }
            
            if (!polizaData.vigencia_inicio || !polizaData.vigencia_fin) {
                showNotification('Las fechas de vigencia son requeridas', 'warning');
                return;
            }
            
            if (polizaData.monto <= 0) {
                showNotification('El monto debe ser mayor que 0', 'warning');
                return;
            }
            
            try {
                console.log('Guardando póliza...', polizaData);
                const savedPoliza = await createPoliza(polizaData);
                
                if (savedPoliza) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('polizaModal'));
                    if (modal) modal.hide();
                    form.reset();
                    await cargarPolizas();
                    showNotification('Póliza guardada exitosamente', 'success');
                    console.log('✅ Póliza guardada:', savedPoliza);
                }
            } catch (error) {
                console.error('❌ Error al guardar póliza:', error);
                showNotification(`Error al guardar póliza: ${error.message}`, 'danger');
            }
        });
    }

    // ... (mantener el resto de las funciones igual: cargarTickets, cargarClientes, etc.)

    function showNotification(message, type = 'info') {
        // Eliminar notificaciones existentes
        document.querySelectorAll('.alert-notification').forEach(el => el.remove());
        
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show alert-notification position-fixed top-0 end-0 m-3`;
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // ... (mantener el resto de las funciones igual)

    console.log('✅ Aplicación cargada completamente');
})();
