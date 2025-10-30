// Importar el cliente de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de Supabase
const supabaseUrl = 'https://fmxtytggeedhqqigyocw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteHR5dGdnZWVkaHFxaWd5b2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTE2MDUsImV4cCI6MjA3NzIyNzYwNX0.xndFnGd6jWAh7cofbBKxEYrotYgiCDSRE4c7-KfNJn4
';

// Crear el cliente
export const supabase = createClient(supabaseUrl, supabaseKey);
