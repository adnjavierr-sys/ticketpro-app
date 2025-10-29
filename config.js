// config.js - Versión alternativa
(function() {
    'use strict';
    
    // Variables de configuración de Supabase
    const SUPABASE_URL = 'https://fmxtytggeedhqqigyocw.supabase.co';
    
    // Usando una función para definir la clave
    function getSupabaseKey() {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteHR5dGdnZWVkaHFxaWd5b2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTE2MDUsImV4cCI6MjA3NzIyNzYwNX0.xndFnGd6jWAh7cofbBKxEYrotYgiCDSRE4c7-KfNJn4';
    }
    
    const SUPABASE_KEY = getSupabaseKey();
    
    // El resto del código igual...
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.error('❌ Error: Las variables de Supabase no están definidas');
        return;
    }
    
    if (typeof supabase === 'undefined') {
        console.error('❌ Error: La librería de Supabase no se cargó');
        return;
    }
    
    try {
        window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Cliente de Supabase creado exitosamente');
    } catch (error) {
        console.error('❌ Error al crear cliente de Supabase:', error);
    }
})();
