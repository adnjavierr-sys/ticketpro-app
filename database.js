import { supabase } from './config.js';

// Función para obtener todos los registros de una tabla
export async function fetchTable(tableName) {
    const { data, error } = await supabase
        .from(tableName)
        .select('*');

    if (error) {
        console.error('Error al obtener datos:', error);
        return [];
    }
    return data;
}

// Función para insertar un nuevo registro
export async function insertRecord(tableName, record) {
    const { data, error } = await supabase
        .from(tableName)
        .insert([record])
        .select();

    if (error) {
        console.error('Error al insertar:', error);
        return null;
    }
    return data[0];
}

// Función para actualizar un registro
export async function updateRecord(tableName, id, updates) {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error al actualizar:', error);
        return null;
    }
    return data[0];
}

// Función para eliminar un registro
export async function deleteRecord(tableName, id) {
    const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error al eliminar:', error);
        return false;
    }
    return true;
}
