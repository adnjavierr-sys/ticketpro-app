// database.js - Versión mejorada para guardar cambios
(function() {
    'use strict';
    
    // Verificar que el cliente de Supabase esté disponible
    if (!window.supabase) {
        console.error('❌ Error: El cliente de Supabase no está disponible');
        return;
    }
    
    // Función auxiliar para manejar errores
    function handleError(error, operation) {
        console.error(`❌ Error al ${operation}:`, error);
        if (error.code === 'PGRST116') {
            console.error('⚠️ Error de permisos. Verifica las políticas de seguridad.');
        }
        return error;
    }
    
    // Funciones de base de datos
    async function getTickets() {
        try {
            const { data, error } = await window.supabase
                .from('tickets')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw handleError(error, 'obtener tickets');
            return data;
        } catch (error) {
            console.error('❌ Error en getTickets:', error);
            throw error;
        }
    }

    async function createTicket(ticketData) {
        try {
            console.log('🎫 Creando ticket:', ticketData);
            
            const { data, error } = await window.supabase
                .from('tickets')
                .insert([ticketData])
                .select()
                .single();
            
            if (error) throw handleError(error, 'crear ticket');
            
            console.log('✅ Ticket creado:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en createTicket:', error);
            throw error;
        }
    }

    async function updateTicket(id, ticketData) {
        try {
            console.log('🔄 Actualizando ticket:', id, ticketData);
            
            const { data, error } = await window.supabase
                .from('tickets')
                .update(ticketData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw handleError(error, 'actualizar ticket');
            
            console.log('✅ Ticket actualizado:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en updateTicket:', error);
            throw error;
        }
    }

    async function deleteTicket(id) {
        try {
            console.log('🗑️ Eliminando ticket:', id);
            
            const { error } = await window.supabase
                .from('tickets')
                .delete()
                .eq('id', id);
            
            if (error) throw handleError(error, 'eliminar ticket');
            
            console.log('✅ Ticket eliminado');
            return true;
        } catch (error) {
            console.error('❌ Error en deleteTicket:', error);
            throw error;
        }
    }

    async function getClientes() {
        try {
            const { data, error } = await window.supabase
                .from('clientes')
                .select('*')
                .order('empresa');
            
            if (error) throw handleError(error, 'obtener clientes');
            return data;
        } catch (error) {
            console.error('❌ Error en getClientes:', error);
            throw error;
        }
    }

    async function createCliente(clienteData) {
        try {
            console.log('🏢 Creando cliente:', clienteData);
            
            const { data, error } = await window.supabase
                .from('clientes')
                .insert([clienteData])
                .select()
                .single();
            
            if (error) throw handleError(error, 'crear cliente');
            
            console.log('✅ Cliente creado:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en createCliente:', error);
            throw error;
        }
    }

    async function updateCliente(id, clienteData) {
        try {
            console.log('🔄 Actualizando cliente:', id, clienteData);
            
            const { data, error } = await window.supabase
                .from('clientes')
                .update(clienteData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw handleError(error, 'actualizar cliente');
            
            console.log('✅ Cliente actualizado:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en updateCliente:', error);
            throw error;
        }
    }

    async function deleteCliente(id) {
        try {
            console.log('🗑️ Eliminando cliente:', id);
            
            const { error } = await window.supabase
                .from('clientes')
                .delete()
                .eq('id', id);
            
            if (error) throw handleError(error, 'eliminar cliente');
            
            console.log('✅ Cliente eliminado');
            return true;
        } catch (error) {
            console.error('❌ Error en deleteCliente:', error);
            throw error;
        }
    }

    async function getAgentes() {
        try {
            const { data, error } = await window.supabase
                .from('agentes')
                .select('*')
                .order('nombre');
            
            if (error) throw handleError(error, 'obtener agentes');
            return data;
        } catch (error) {
            console.error('❌ Error en getAgentes:', error);
            throw error;
        }
    }

    async function createAgente(agenteData) {
        try {
            console.log('👥 Creando agente:', agenteData);
            
            const { data, error } = await window.supabase
                .from('agentes')
                .insert([agenteData])
                .select()
                .single();
            
            if (error) throw handleError(error, 'crear agente');
            
            console.log('✅ Agente creado:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en createAgente:', error);
            throw error;
        }
    }

    async function updateAgente(id, agenteData) {
        try {
            console.log('🔄 Actualizando agente:', id, agenteData);
            
            const { data, error } = await window.supabase
                .from('agentes')
                .update(agenteData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw handleError(error, 'actualizar agente');
            
            console.log('✅ Agente actualizado:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en updateAgente:', error);
            throw error;
        }
    }

    async function deleteAgente(id) {
        try {
            console.log('🗑️ Eliminando agente:', id);
            
            const { error } = await window.supabase
                .from('agentes')
                .delete()
                .eq('id', id);
            
            if (error) throw handleError(error, 'eliminar agente');
            
            console.log('✅ Agente eliminado');
            return true;
        } catch (error) {
            console.error('❌ Error en deleteAgente:', error);
            throw error;
        }
    }

    async function getPolizas() {
        try {
            const { data, error } = await window.supabase
                .from('polizas')
                .select('*')
                .order('vigencia_inicio', { ascending: false });
            
            if (error) throw handleError(error, 'obtener pólizas');
            return data;
        } catch (error) {
            console.error('❌ Error en getPolizas:', error);
            throw error;
        }
    }

    async function createPoliza(polizaData) {
        try {
            console.log('📋 Creando póliza:', polizaData);
            
            const { data, error } = await window.supabase
                .from('polizas')
                .insert([polizaData])
                .select()
                .single();
            
            if (error) throw handleError(error, 'crear póliza');
            
            console.log('✅ Póliza creada:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en createPoliza:', error);
            throw error;
        }
    }

    async function updatePoliza(id, polizaData) {
        try {
            console.log('🔄 Actualizando póliza:', id, polizaData);
            
            const { data, error } = await window.supabase
                .from('polizas')
                .update(polizaData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw handleError(error, 'actualizar póliza');
            
            console.log('✅ Póliza actualizada:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en updatePoliza:', error);
            throw error;
        }
    }

    async function deletePoliza(id) {
        try {
            console.log('🗑️ Eliminando póliza:', id);
            
            const { error } = await window.supabase
                .from('polizas')
                .delete()
                .eq('id', id);
            
            if (error) throw handleError(error, 'eliminar póliza');
            
            console.log('✅ Póliza eliminada');
            return true;
        } catch (error) {
            console.error('❌ Error en deletePoliza:', error);
            throw error;
        }
    }

    // Exponer funciones globalmente
    window.getTickets = getTickets;
    window.createTicket = createTicket;
    window.updateTicket = updateTicket;
    window.deleteTicket = deleteTicket;
    window.getClientes = getClientes;
    window.createCliente = createCliente;
    window.updateCliente = updateCliente;
    window.deleteCliente = deleteCliente;
    window.getAgentes = getAgentes;
    window.createAgente = createAgente;
    window.updateAgente = updateAgente;
    window.deleteAgente = deleteAgente;
    window.getPolizas = getPolizas;
    window.createPoliza = createPoliza;
    window.updatePoliza = updatePoliza;
    window.deletePoliza = deletePoliza;

    console.log('✅ Funciones de base de datos cargadas exitosamente');
})();
