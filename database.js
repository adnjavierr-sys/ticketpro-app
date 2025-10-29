// database.js
(function() {
    'use strict';
    
    // Wait for Supabase to be available
    function waitForSupabase(callback, maxAttempts = 10) {
        let attempts = 0;
        
        function checkSupabase() {
            attempts++;
            
            if (typeof window.supabase !== 'undefined') {
                console.log('✅ Supabase disponible después de', attempts, 'intentos');
                callback();
            } else if (attempts < maxAttempts) {
                console.log('⏳ Esperando Supabase... Intento', attempts, 'de', maxAttempts);
                setTimeout(checkSupabase, 500);
            } else {
                console.error('❌ Supabase no disponible después de', maxAttempts, 'intentos');
            }
        }
        
        checkSupabase();
    }
    
    waitForSupabase(function() {
        if (!window.supabase) {
            console.error('❌ Error: El cliente de Supabase no está disponible');
            return;
        }
        
        // Functions for database operations
        async function getTickets() {
            try {
                const { data, error } = await window.supabase
                    .from('tickets')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) {
                    console.error('❌ Error al obtener tickets:', error);
                    throw error;
                }
                
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
                
                if (error) {
                    console.error('❌ Error al crear ticket:', error);
                    throw error;
                }
                
                console.log('✅ Ticket creado:', data);
                return data;
            } catch (error) {
                console.error('❌ Error en createTicket:', error);
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
                
                if (error) {
                    console.error('❌ Error al eliminar ticket:', error);
                    throw error;
                }
                
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
                
                if (error) {
                    console.error('❌ Error al obtener clientes:', error);
                    throw error;
                }
                
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
                
                if (error) {
                    console.error('❌ Error al crear cliente:', error);
                    throw error;
                }
                
                console.log('✅ Cliente creado:', data);
                return data;
            } catch (error) {
                console.error('❌ Error en createCliente:', error);
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
                
                if (error) {
                    console.error('❌ Error al eliminar cliente:', error);
                    throw error;
                }
                
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
                
                if (error) {
                    console.error('❌ Error al obtener agentes:', error);
                    throw error;
                }
                
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
                
                if (error) {
                    console.error('❌ Error al crear agente:', error);
                    throw error;
                }
                
                console.log('✅ Agente creado:', data);
                return data;
            } catch (error) {
                console.error('❌ Error en createAgente:', error);
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
                
                if (error) {
                    console.error('❌ Error al eliminar agente:', error);
                    throw error;
                }
                
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
                
                if (error) {
                    console.error('❌ Error al obtener pólizas:', error);
                    throw error;
                }
                
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
                
                if (error) {
                    console.error('❌ Error al crear póliza:', error);
                    throw error;
                }
                
                console.log('✅ Póliza creada:', data);
                return data;
            } catch (error) {
                console.error('❌ Error en createPoliza:', error);
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
                
                if (error) {
                    console.error('❌ Error al eliminar póliza:', error);
                    throw error;
                }
                
                console.log('✅ Póliza eliminada');
                return true;
            } catch (error) {
                console.error('❌ Error en deletePoliza:', error);
                throw error;
            }
        }

        // Expose functions globally
        window.getTickets = getTickets;
        window.createTicket = createTicket;
        window.deleteTicket = deleteTicket;
        window.getClientes = getClientes;
        window.createCliente = createCliente;
        window.deleteCliente = deleteCliente;
        window.getAgentes = getAgentes;
        window.createAgente = createAgente;
        window.deleteAgente = deleteAgente;
        window.getPolizas = getPolizas;
        window.createPoliza = createPoliza;
        window.deletePoliza = deletePoliza;

        console.log('✅ Funciones de base de datos cargadas exitosamente');
    });
})();
