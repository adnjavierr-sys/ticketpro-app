// app.js - Versión corregida para navegación
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
        
        // Mostrar dashboard por defecto
        showPage('dashboard');
    }

    function setupNavigation() {
        console.log('🔄 Configurando navegación...');
        
        // Usar delegación de eventos para el menú
        document.addEventListener('click', function(e) {
            // Verificar si el clic fue en un enlace de navegación
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                handleNavigation(navLink);
            }
        });
        
        // También configurar explícitamente cada enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                handleNavigation(this);
            });
        });
    }

    function handleNavigation(clickedLink) {
        console.log('🔄 Navegando a:', clickedLink.getAttribute('data-page'));
        
        // Remover clase activa de todos los enlaces
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Agregar clase activa al enlace clickeado
        clickedLink.classList.add('active');
        
        // Obtener el nombre de la página
        const pageName = clickedLink.getAttribute('data-page');
        
        // Mostrar la página correspondiente
        showPage(pageName);
    }

    function showPage(pageName) {
        console.log('📄 Mostrando página:', pageName);
        
        // Ocultar todas las páginas
        document.querySelectorAll('.page-content').forEach(page => {
            page.style.display = 'none';
        });
        
        // Mostrar la página solicitada
        const targetPage = document.getElementById(pageName + '-page');
        if (targetPage) {
            targetPage.style.display = 'block';
            console.log('✅ Página', pageName, 'mostrada exitosamente');
            
            // Inicializar gráficos si es necesario
            if (pageName === 'dashboard') {
                setTimeout(initCharts, 100);
            } else if (pageName === 'agentes') {
                setTimeout(initAgentCharts, 100);
            }
        } else {
            console.warn('⚠️ Página', pageName, 'no encontrada');
        }
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
        console.log('📝 Configurando formularios...');
        setupTicketForm();
        setupClienteForm();
        setupAgenteForm();
        setupPolizaForm();
    }

    // ... (mantener el resto de las funciones igual: setupTicketForm, setupClienteForm, etc.)
    
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
