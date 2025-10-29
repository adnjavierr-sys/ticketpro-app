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
// Agregar esta función al final de app.js para depuración
function debugNavigation() {
    console.log('=== DEPURACIÓN DE NAVEGACIÓN ===');
    
    // Verificar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Enlaces encontrados:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        const pageName = link.getAttribute('data-page');
        const pageElement = document.getElementById(pageName + '-page');
        console.log(`Enlace ${index}:`, {
            text: link.textContent.trim(),
            pageName: pageName,
            pageExists: !!pageElement,
            isActive: link.classList.contains('active')
        });
    });
    
    // Verificar páginas visibles
    const visiblePages = document.querySelectorAll('.page-content:not([style*="display: none"])');
    console.log('Páginas visibles:', visiblePages.length);
    
    visiblePages.forEach(page => {
        console.log('Página visible:', page.id);
    });
}

// Llamar a la función de depuración cuando se carga la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación...');
    initApp();
    
    // Llamar a depuración después de un momento
    setTimeout(debugNavigation, 1000);
});
