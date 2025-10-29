// config.js - Versión robusta
(function() {
    'use strict';
    
    // Verificar si las variables están definidas
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_KEY === 'undefined') {
        console.error('Error: Las variables de Supabase no están definidas');
        
        // Crear variables de fallback (para desarrollo)
        window.SUPABASE_URL = 'https://fmxtytggeedhqqigyocw.supabase.co';
        window.SUPABASE_KEY = ''eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteHR5dGdnZWVkaHFxaWd5b2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTE2MDUsImV4cCI6MjA3NzIyNzYwNX0.xndFnGd6jWAh7cofbBKxEYrotYgiCDSRE4c7-KfNJn4';
        
        console.log('Usando variables de fallback');
    }
    
    // Verificar si supabase está disponible
    if (typeof supabase === 'undefined') {
        console.error('Error: La librería de Supabase no se cargó');
        return;
    }
    
    // Crear el cliente de Supabase
    try {
        window.supabase = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
        console.log('Cliente de Supabase creado exitosamente');
    } catch (error) {
        console.error('Error al crear cliente de Supabase:', error);
    }
})();
// Depuración - agregar al final
console.log('=== DEPURACIÓN SUPABASE ===');
console.log('SUPABASE_URL:', typeof SUPABASE_URL, SUPABASE_URL);
console.log('SUPABASE_KEY:', typeof SUPABASE_KEY, SUPABASE_KEY ? 'Presente' : 'Ausente');
console.log('supabase global:', typeof window.supabase);
