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
        const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxNni43kdQwgnWNReilDMblYTn_I0U';
        
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
