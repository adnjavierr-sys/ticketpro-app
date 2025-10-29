// app.js - Versión corregida
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

    async function cargarTickets() {
        try {
            console.log('🎫 Cargando tickets...');
            const tickets = await getTickets();
            const tbody = document.getElementById('ticketsTableBody');
            
            if (!tbody) {
                console.warn('⚠️ No se encontró tbody para tickets');
                return;
            }
            
            tbody.innerHTML = tickets.map(ticket => `
                <tr>
                    <td>#${String(ticket.id || '').padStart(5, '0')}</td>
                    <td>${ticket.titulo || 'Sin título'}</td>
                    <td>${ticket.cliente_id || 'N/A'}</td>
                    <td><span class="badge badge-${(ticket.categoria || 'otros').toLowerCase()}">${ticket.categoria || 'Otros'}</span></td>
                    <td><span class="status-badge status-${(ticket.estado || 'abierto').toLowerCase().replace(' ', '-')}">${ticket.estado || 'Abierto'}</span></td>
                    <td><span class="agent-chip"><i class="fas fa-circle agent-${ticket.agente_id ? 'online' : 'offline'}"></i> ${ticket.agente_id || 'Sin asignar'}</span></td>
                    <td><span class="badge bg-${(ticket.prioridad || 'media').toLowerCase() === 'alta' ? 'danger' : (ticket.prioridad || 'media').toLowerCase() === 'media' ? 'warning' : 'success'}">${ticket.prioridad || 'Media'}</span></td>
                    <td>${ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editarTicket(${ticket.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarTicket(${ticket.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
            
            console.log('✅ Tickets cargados:', tickets.length);
        } catch (error) {
            console.error('❌ Error al cargar tickets:', error);
            showNotification('Error al cargar los tickets', 'danger');
        }
    }

    async function cargarClientes() {
        try {
            console.log('🏢 Cargando clientes...');
            const clientes = await getClientes();
            const tbody = document.getElementById('clientesTableBody');
            
            if (tbody) {
                tbody.innerHTML = clientes.map(cliente => `
                    <tr>
                        <td>${cliente.id || ''}</td>
                        <td>${cliente.empresa || 'Sin nombre'}</td>
                        <td>${cliente.contacto || 'Sin contacto'}</td>
                        <td>${cliente.email || 'sin email'}</td>
                        <td>${cliente.telefono || 'sin teléfono'}</td>
                        <td><span class="badge bg-success">Activo</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${cliente.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('');
            }
            
            console.log('✅ Clientes cargados:', clientes.length);
        } catch (error) {
            console.error('❌ Error al cargar clientes:', error);
        }
    }

    async function cargarAgentes() {
        try {
            console.log('👥 Cargando agentes...');
            const agentes = await getAgentes();
            const tbody = document.getElementById('agentesTableBody');
            
            if (tbody) {
                tbody.innerHTML = agentes.map(agente => `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="user-avatar me-2">${(agente.nombre || 'A').charAt(0)}</div>
                                <div>
                                    <div class="fw-bold">${agente.nombre || 'Sin nombre'}</div>
                                    <small class="text-muted">${agente.email || 'sin email'}</small>
                                </div>
                            </div>
                        </td>
                        <td>${agente.email || 'sin email'}</td>
                        <td><span class="role-badge role-${(agente.rol || 'agente').toLowerCase()}">${agente.rol || 'Agente'}</span></td>
                        <td><span class="badge bg-info">${agente.especialidad || 'General'}</span></td>
                        <td><span class="agent-status agent-${(agente.estado || 'offline').toLowerCase()}">${agente.estado || 'Offline'}</span></td>
                        <td><span class="badge bg-primary">${agente.tickets_asignados || 0}</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarAgente(${agente.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('');
            }
            
            console.log('✅ Agentes cargados:', agentes.length);
        } catch (error) {
            console.error('❌ Error al cargar agentes:', error);
        }
    }

    async function cargarPolizas() {
        try {
            console.log('📋 Cargando pólizas...');
            const polizas = await getPolizas();
            const tbody = document.getElementById('polizasTableBody');
            
            if (tbody) {
                tbody.innerHTML = polizas.map(poliza => `
                    <tr>
                        <td>${poliza.id || ''}</td>
                        <td>${poliza.cliente_id || 'N/A'}</td>
                        <td>${poliza.tipo || 'Desconocido'}</td>
                        <td>${poliza.vigencia_inicio || 'N/A'}</td>
                        <td>${poliza.vigencia_fin || 'N/A'}</td>
                        <td>${poliza.monto || '0.00'}</td>
                        <td><span class="badge bg-${poliza.estado === 'Vigente' ? 'success' : poliza.estado === 'Por Vencer' ? 'warning' : 'danger'}">${poliza.estado || 'Desconocido'}</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarPoliza(${poliza.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('');
            }
            
            console.log('✅ Pólizas cargadas:', polizas.length);
        } catch (error) {
            console.error('❌ Error al cargar pólizas:', error);
        }
    }

    async function cargarClientesEnSelects() {
        try {
            console.log('🔄 Cargando clientes en selects...');
            const clientes = await getClientes();
            const agentes = await getAgentes();
            
            const ticketClienteSelect = document.getElementById('clienteSelect');
            if (ticketClienteSelect) {
                ticketClienteSelect.innerHTML = '<option value="">Seleccionar cliente</option>' +
                    clientes.map(cliente => `<option value="${cliente.id}">${cliente.empresa}</option>`).join('');
            }
            
            const agenteSelect = document.getElementById('agenteSelect');
            if (agenteSelect) {
                agenteSelect.innerHTML = '<option value="">Sin asignar</option>' +
                    agentes.map(agente => `<option value="${agente.id}">${agente.nombre}</option>`).join('');
            }
            
            const polizaClienteSelect = document.getElementById('polizaClienteSelect');
            if (polizaClienteSelect) {
                polizaClienteSelect.innerHTML = '<option value="">Seleccionar cliente</option>' +
                    clientes.map(cliente => `<option value="${cliente.id}">${cliente.empresa}</option>`).join('');
            }
            
            console.log('✅ Selects actualizados');
        } catch (error) {
            console.error('❌ Error al cargar datos para selects:', error);
            showNotification('Error al cargar datos', 'danger');
        }
    }

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

    // Funciones para inicializar gráficos
    function initCharts() {
        // Tickets Evolution Chart
        const ticketsCtx = document.getElementById('ticketsChart');
        if (ticketsCtx) {
            new Chart(ticketsCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Tickets Abiertos',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'Tickets Resueltos',
                        data: [28, 48, 40, 19, 86, 27],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });
        }

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Soporte', 'Hosting', 'Oportuno', 'Otros'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: ['#2563eb', '#f59e0b', '#10b981', '#64748b']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Reportes Chart
        const reportesCtx = document.getElementById('reportesChart');
        if (reportesCtx) {
            new Chart(reportesCtx, {
                type: 'bar',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Reportes Generados',
                        data: [12, 19, 15, 25, 22, 30],
                        backgroundColor: '#2563eb'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    function initAgentCharts() {
        // Agent Performance Chart
        const agentPerfCtx = document.getElementById('agentPerformanceChart');
        if (agentPerfCtx) {
            new Chart(agentPerfCtx, {
                type: 'radar',
                data: {
                    labels: ['Resolución', 'Satisfacción', 'Velocidad', 'Precisión', 'Comunicación'],
                    datasets: [{
                        label: 'Juan Pérez',
                        data: [85, 90, 75, 88, 92],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.2)'
                    }, {
                        label: 'María García',
                        data: [92, 85, 88, 90, 87],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Agent Tickets Chart
        const agentTicketsCtx = document.getElementById('agentTicketsChart');
        if (agentTicketsCtx) {
            new Chart(agentTicketsCtx, {
                type: 'bar',
                data: {
                    labels: ['Juan', 'María', 'Carlos', 'Ana'],
                    datasets: [{
                        label: 'Tickets Resueltos',
                        data: [45, 38, 25, 15],
                        backgroundColor: '#2563eb'
                    }, {
                        label: 'Tickets Pendientes',
                        data: [8, 5, 3, 2],
                        backgroundColor: '#f59e0b'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    console.log('✅ Aplicación cargada completamente');
})();
