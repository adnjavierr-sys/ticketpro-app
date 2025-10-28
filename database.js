// database.js
// Asegurarse de que el cliente de Supabase esté disponible
if (!window.supabase) {
    console.error('Error: El cliente de Supabase no está disponible');
} else {
    // Funciones de base de datos
    async function getTickets() {
        const { data, error } = await window.supabase
            .from('tickets')
            .select(`
                *,
                clientes: clientes_id (empresa),
                agentes: agentes_id (nombre)
            `);
        
        if (error) {
            console.error('Error al obtener tickets:', error);
            throw error;
        }
        
        return data;
    }

    async function createTicket(ticketData) {
        const { data, error } = await window.supabase
            .from('tickets')
            .insert([ticketData])
            .select()
            .single();
        
        if (error) {
            console.error('Error al crear ticket:', error);
            throw error;
        }
        
        return data;
    }

    async function deleteTicket(id) {
        const { error } = await window.supabase
            .from('tickets')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error al eliminar ticket:', error);
            throw error;
        }
        
        return true;
    }

    async function getClientes() {
        const { data, error } = await window.supabase
            .from('clientes')
            .select('*');
        
        if (error) {
            console.error('Error al obtener clientes:', error);
            throw error;
        }
        
        return data;
    }

    async function createCliente(clienteData) {
        const { data, error } = await window.supabase
            .from('clientes')
            .insert([clienteData])
            .select()
            .single();
        
        if (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
        
        return data;
    }

    async function deleteCliente(id) {
        const { error } = await window.supabase
            .from('clientes')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
        
        return true;
    }

    async function getAgentes() {
        const { data, error } = await window.supabase
            .from('agentes')
            .select('*');
        
        if (error) {
            console.error('Error al obtener agentes:', error);
            throw error;
        }
        
        return data;
    }

    async function createAgente(agenteData) {
        const { data, error } = await window.supabase
            .from('agentes')
            .insert([agenteData])
            .select()
            .single();
        
        if (error) {
            console.error('Error al crear agente:', error);
            throw error;
        }
        
        return data;
    }

    async function deleteAgente(id) {
        const { error } = await window.supabase
            .from('agentes')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error al eliminar agente:', error);
            throw error;
        }
        
        return true;
    }

    async function getPolizas() {
        const { data, error } = await window.supabase
            .from('polizas')
            .select(`
                *,
                clientes: clientes_id (empresa)
            `);
        
        if (error) {
            console.error('Error al obtener pólizas:', error);
            throw error;
        }
        
        return data;
    }

    async function createPoliza(polizaData) {
        const { data, error } = await window.supabase
            .from('polizas')
            .insert([polizaData])
            .select()
            .single();
        
        if (error) {
            console.error('Error al crear póliza:', error);
            throw error;
        }
        
        return data;
    }

    async function deletePoliza(id) {
        const { error } = await window.supabase
            .from('polizas')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error al eliminar póliza:', error);
            throw error;
        }
        
        return true;
    }
}
