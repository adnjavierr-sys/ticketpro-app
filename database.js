// database.js
import { supabase } from './config.js';

// Clientes
export async function getClientes() {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching clientes:', error);
    return [];
  }
  
  return data;
}

export async function createCliente(cliente) {
  const { data, error } = await supabase
    .from('clientes')
    .insert([cliente])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating cliente:', error);
    return null;
  }
  
  return data;
}

export async function updateCliente(id, updates) {
  const { data, error } = await supabase
    .from('clientes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating cliente:', error);
    return null;
  }
  
  return data;
}

export async function deleteCliente(id) {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting cliente:', error);
    return false;
  }
  
  return true;
}

// Tickets
export async function getTickets() {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      *,
      clientes (empresa, contacto, email),
      agentes (nombre, email)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
  
  return data;
}

export async function createTicket(ticket) {
  const { data, error } = await supabase
    .from('tickets')
    .insert([ticket])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating ticket:', error);
    return null;
  }
  
  return data;
}

export async function updateTicket(id, updates) {
  const { data, error } = await supabase
    .from('tickets')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating ticket:', error);
    return null;
  }
  
  return data;
}

export async function deleteTicket(id) {
  const { error } = await supabase
    .from('tickets')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting ticket:', error);
    return false;
  }
  
  return true;
}

// Agentes
export async function getAgentes() {
  const { data, error } = await supabase
    .from('agentes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching agentes:', error);
    return [];
  }
  
  return data;
}

export async function createAgente(agente) {
  const { data, error } = await supabase
    .from('agentes')
    .insert([agente])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating agente:', error);
    return null;
  }
  
  return data;
}

export async function updateAgente(id, updates) {
  const { data, error } = await supabase
    .from('agentes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating agente:', error);
    return null;
  }
  
  return data;
}

export async function deleteAgente(id) {
  const { error } = await supabase
    .from('agentes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting agente:', error);
    return false;
  }
  
  return true;
}

// Pólizas
export async function getPolizas() {
  const { data, error } = await supabase
    .from('polizas')
    .select(`
      *,
      clientes (empresa, contacto, email)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching polizas:', error);
    return [];
  }
  
  return data;
}

export async function createPoliza(poliza) {
  const { data, error } = await supabase
    .from('polizas')
    .insert([poliza])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating poliza:', error);
    return null;
  }
  
  return data;
}

export async function updatePoliza(id, updates) {
  const { data, error } = await supabase
    .from('polizas')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating poliza:', error);
    return null;
  }
  
  return data;
}

export async function deletePoliza(id) {
  const { error } = await supabase
    .from('polizas')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting poliza:', error);
    return false;
  }
  
  return true;
}
