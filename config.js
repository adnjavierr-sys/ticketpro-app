// config.js
const SUPABASE_URL = 'https://fmxtytggeedhqqigyocw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteHR5dGdnZWVkaHFxaWd5b2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTE2MDUsImV4cCI6MjA3NzIyNzYwNX0.xndFnGd6jWAh7cofbBKxEYrotYgiCDSRE4c7-KfNJn4'
// Crear el cliente de Supabase
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('Configuración de Supabase cargada');
console.log('URL:', SUPABASE_URL);
console.log('Key disponible:', !!SUPABASE_KEY);

