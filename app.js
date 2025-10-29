// app.js
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
        
        // Show dashboard by default
        showPage('dashboard');
    }

    function setupNavigation() {
        console.log('🔄 Configurando navegación...');
        
        // Use event delegation for the menu
        document.addEventListener('click', function(e) {
            // Check if the click was on a navigation link
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                handleNavigation(navLink);
            }
        });
        
        // Also explicitly set up each link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                handleNavigation(this);
            });
        });
    }

    function handleNavigation(clickedLink) {
        console.log('🔄 Navegando a:', clickedLink.getAttribute('data-page'));
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Get the page name
        const pageName = clickedLink.getAttribute('data-page');
        
        // Show the corresponding page
        showPage(pageName);
    }

    function showPage(pageName) {
        console.log('📄 Mostrando página:', pageName);
        
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.style.display = 'none';
        });
        
        // Show the requested page
        const targetPage = document.getElementById(pageName + '-page');
        if (targetPage) {
            targetPage.style.display = 'block';
            console.log('✅ Página', pageName, 'mostr
