// config.js - Versión corregida
(function() {
    'use strict';
    
    // Verificar si supabase está disponible
    if (typeof supabase === 'undefined') {
        console.error('❌ Error: La librería de Supabase no se cargó');
        // Intentar cargar la librería dinámicamente
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/dist/umd/supabase.min.js';
        script.onload = function() {
            console.log('✅ Librería de Supabase cargada dinámicamente');
            initializeSupabase();
        };
        document.head.appendChild(script);
        return;
    }
    
    initializeSupabase();
    
    function initializeSupabase() {
        // Variables de configuración de Supabase
        const SUPABASE_URL = 'https://fmxtytggeedhqqigyocw.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteHR5dGdnZWVkaHFxaWd5b2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTE2MDUsImV4cCI6MjA3NzIyNzYwNX0.xndFnGd6jWAh7cofbBKxEYrotYgiCDSRE4c7-KfNJn4';
        
        // Verificar que las variables estén definidas
        if (!SUPABASE_URL || !SUPABASE_KEY) {
            console.error('❌ Error: Las variables de Supabase no están definidas');
            console.error('SUPABASE_URL:', SUPABASE_URL);
            console.error('SUPABASE_KEY:', SUPABASE_KEY ? 'Presente' : 'Ausente');
            return;
        }
        
        // Crear el cliente de Supabase
        try {
            window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ Cliente de Supabase creado exitosamente');
            console.log('URL:', SUPABASE_URL);
            console.log('Key disponible:', !!SUPABASE_KEY);
        } catch (error) {
            console.error('❌ Error al crear cliente de Supabase:', error);
        }
    }
})();


