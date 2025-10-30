<!DOCTYPE html>
<html lang="es">
<head>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/dist/umd/supabase.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Gestión de Tickets - TicketPro</title>
    <meta name="description" content="Sistema completo de gestión de tickets con categorías, clientes, pólizas y reportes automáticos">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- LIBRERÍA DE SUPABASE -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/dist/umd/supabase.min.js"></script>
    
    <!-- Configuración de Supabase -->
    <script src="config.js"></script>
    
    <!-- Funciones de base de datos -->
    <script src="database.js"></script>
    
    <!-- Scripts de la aplicación -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="app.js"></script>
</head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Gestión de Tickets - TicketPro</title>
    <meta name="description" content="Sistema completo de gestión de tickets con categorías, clientes, pólizas y reportes automáticos">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2563eb;
            --secondary-color: #64748b;
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --dark-color: #1e293b;
            --light-bg: #f8fafc;
            --sidebar-width: 250px;
            --admin-color: #7c3aed;
            --agent-color: #3b82f6;
            --manager-color: #059669;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--light-bg);
            color: var(--dark-color);
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: var(--sidebar-width);
            background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);
            color: white;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-header h3 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .nav-menu {
            list-style: none;
            padding: 20px 0;
        }

        .nav-item {
            margin-bottom: 5px;
        }

        .nav-link {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
        }

        .nav-link:hover, .nav-link.active {
            background-color: rgba(255,255,255,0.1);
            color: white;
            border-left-color: white;
        }

        .nav-link i {
            margin-right: 10px;
            width: 20px;
        }

        .role-badge {
            font-size: 0.7rem;
            padding: 2px 8px;
            border-radius: 12px;
            margin-left: auto;
            font-weight: 500;
        }

        .role-admin { background-color: var(--admin-color); }
        .role-agent { background-color: var(--agent-color); }
        .role-manager { background-color: var(--manager-color); }

        .main-content {
            margin-left: var(--sidebar-width);
            min-height: 100vh;
            transition: all 0.3s ease;
        }

        .topbar {
            background: white;
            padding: 15px 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), #1e40af);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
        }

        .toggle-sidebar {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-color);
            cursor: pointer;
        }

        .content-area {
            padding: 30px;
        }

        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-left: 4px solid;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .stat-card.primary { border-left-color: var(--primary-color); }
        .stat-card.success { border-left-color: var(--success-color); }
        .stat-card.warning { border-left-color: var(--warning-color); }
        .stat-card.danger { border-left-color: var(--danger-color); }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 15px;
        }

        .stat-card.primary .stat-icon { background: rgba(37, 99, 235, 0.1); color: var(--primary-color); }
        .stat-card.success .stat-icon { background: rgba(16, 185, 129, 0.1); color: var(--success-color); }
        .stat-card.warning .stat-icon { background: rgba(245, 158, 11, 0.1); color: var(--warning-color); }
        .stat-card.danger .stat-icon { background: rgba(239, 68, 68, 0.1); color: var(--danger-color); }

        .table-container {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .table th {
            background-color: var(--light-bg);
            font-weight: 600;
            color: var(--dark-color);
            border: none;
            padding: 15px;
        }

        .table td {
            padding: 15px;
            vertical-align: middle;
            border-color: #e5e7eb;
        }

        .badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 500;
        }

        .badge-soporte { background-color: #dbeafe; color: #1e40af; }
        .badge-hosting { background-color: #fef3c7; color: #92400e; }
        .badge-oportuno { background-color: #d1fae5; color: #065f46; }
        .badge-otros { background-color: #e5e7eb; color: #374151; }

        .agent-status {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .agent-online { background-color: #d1fae5; color: #065f46; }
        .agent-busy { background-color: #fef3c7; color: #92400e; }
        .agent-offline { background-color: #fee2e2; color: #991b1b; }

        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .status-open { background-color: #fef3c7; color: #92400e; }
        .status-progress { background-color: #dbeafe; color: #1e40af; }
        .status-resolved { background-color: #d1fae5; color: #065f46; }
        .status-closed { background-color: #e5e7eb; color: #374151; }

        .search-box {
            position: relative;
        }

        .search-box input {
            padding-left: 40px;
        }

        .search-box i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
        }

        .permission-item {
            background: #f8fafc;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            border: 1px solid #e5e7eb;
        }

        .permission-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .permission-toggle {
            position: relative;
            width: 50px;
            height: 24px;
        }

        .permission-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .permission-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #cbd5e1;
            transition: .4s;
            border-radius: 24px;
        }

        .permission-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .permission-slider {
            background-color: var(--primary-color);
        }

        input:checked + .permission-slider:before {
            transform: translateX(26px);
        }

        .agent-chip {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            padding: 5px 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.875rem;
        }

        .form-container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .form-label {
            font-weight: 600;
            color: var(--dark-color);
            margin-bottom: 8px;
        }

        .form-control, .form-select {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 10px 15px;
            transition: all 0.3s ease;
        }

        .form-control:focus, .form-select:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .btn-primary {
            background-color: var(--primary-color);
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #1e40af;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        }

        .btn-danger {
            background-color: var(--danger-color);
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .btn-danger:hover {
            background-color: #dc2626;
        }

        .modal-content {
            border-radius: 12px;
            border: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .modal-header {
            border-bottom: 1px solid #e5e7eb;
            padding: 20px 25px;
        }

        .modal-body {
            padding: 25px;
        }

        .permission-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }

            .sidebar.active {
                transform: translateX(0);
            }

            .main-content {
                margin-left: 0;
            }

            .toggle-sidebar {
                display: block;
            }

            .content-area {
                padding: 20px;
            }

            .stat-card {
                margin-bottom: 20px;
            }
        }

        .chart-container {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            height: 400px;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <h3><i class="fas fa-ticket-alt me-2"></i> TicketPro</h3>
        </div>
        <nav>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link active" data-page="dashboard">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-page="tickets">
                        <i class="fas fa-ticket-alt"></i>
                        <span>Tickets</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-page="clientes">
                        <i class="fas fa-users"></i>
                        <span>Clientes</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-page="polizas">
                        <i class="fas fa-file-contract"></i>
                        <span>Pólizas</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-page="agentes">
                        <i class="fas fa-user-tie"></i>
                        <span>Agentes</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-page="permisos">
                        <i class="fas fa-shield-alt"></i>
                        <span>Permisos</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-page="reportes">
                        <i class="fas fa-chart-bar"></i>
                        <span>Reportes</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-page="configuracion">
                        <i class="fas fa-cog"></i>
                        <span>Configuración</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Topbar -->
        <header class="topbar">
            <button class="toggle-sidebar" id="toggleSidebar">
                <i class="fas fa-bars"></i>
            </button>
            <div class="user-info">
                <span class="me-3">Bienvenido, <strong>Administrador</strong></span>
                <span class="role-badge role-admin">Admin</span>
                <div class="user-avatar">A</div>
                <button class="btn btn-sm btn-outline-primary">
                    <i class="fas fa-user-circle me-1"></i> Perfil
                </button>
            </div>
        </header>

        <!-- Content Area -->
        <div class="content-area">
            <!-- Dashboard Page -->
            <div id="dashboard-page" class="page-content">
                <h2 class="mb-4">Dashboard</h2>
                
                <!-- Statistics Cards -->
                <div class="row mb-4">
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card primary">
                            <div class="stat-icon">
                                <i class="fas fa-ticket-alt"></i>
                            </div>
                            <h3 class="mb-1">156</h3>
                            <p class="text-muted mb-0">Total Tickets</p>
                            <small class="text-success"><i class="fas fa-arrow-up"></i> 12% vs mes anterior</small>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card success">
                            <div class="stat-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3 class="mb-1">89</h3>
                            <p class="text-muted mb-0">Resueltos</p>
                            <small class="text-success"><i class="fas fa-arrow-up"></i> 8% vs mes anterior</small>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card warning">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h3 class="mb-1">42</h3>
                            <p class="text-muted mb-0">En Progreso</p>
                            <small class="text-danger"><i class="fas fa-arrow-down"></i> 5% vs mes anterior</small>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card danger">
                            <div class="stat-icon">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <h3 class="mb-1">25</h3>
                            <p class="text-muted mb-0">Pendientes</p>
                            <small class="text-warning"><i class="fas fa-minus"></i> Sin cambio</small>
                        </div>
                    </div>
                </div>

                <!-- Charts Row -->
                <div class="row">
                    <div class="col-lg-8 mb-4">
                        <div class="chart-container">
                            <h5 class="mb-3">Evolución de Tickets</h5>
                            <canvas id="ticketsChart"></canvas>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="chart-container">
                            <h5 class="mb-3">Distribución por Categoría</h5>
                            <canvas id="categoryChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Recent Tickets -->
                <div class="table-container">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5>Tickets Recientes</h5>
                        <button class="btn btn-primary btn-sm">Ver Todos</button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Cliente</th>
                                    <th>Categoría</th>
                                    <th>Estado</th>
                                    <th>Agente Asignado</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#00123</td>
                                    <td>Error en el sistema de facturación</td>
                                    <td>Empresa ABC S.A.</td>
                                    <td><span class="badge badge-soporte">Soporte</span></td>
                                    <td><span class="status-badge status-progress">En Progreso</span></td>
                                    <td><span class="agent-chip"><i class="fas fa-circle agent-online"></i> Juan Pérez</span></td>
                                    <td>2024-01-15</td>
                                </tr>
                                <tr>
                                    <td>#00122</td>
                                    <td>Nueva solicitud de hosting</td>
                                    <td>Tech Solutions</td>
                                    <td><span class="badge badge-hosting">Hosting</span></td>
                                    <td><span class="status-badge status-open">Abierto</span></td>
                                    <td><span class="agent-chip"><i class="fas fa-circle agent-offline"></i> Sin asignar</span></td>
                                    <td>2024-01-14</td>
                                </tr>
                                <tr>
                                    <td>#00121</td>
                                    <td>Actualización de póliza</td>
                                    <td>Global Corp</td>
                                    <td><span class="badge badge-oportuno">Oportuno</span></td>
                                    <td><span class="status-badge status-resolved">Resuelto</span></td>
                                    <td><span class="agent-chip"><i class="fas fa-circle agent-online"></i> María García</span></td>
                                    <td>2024-01-13</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Tickets Page -->
            <div id="tickets-page" class="page-content" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Gestión de Tickets</h2>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ticketModal">
                        <i class="fas fa-plus me-2"></i>Nuevo Ticket
                    </button>
                </div>

                <div class="table-container">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" class="form-control" placeholder="Buscar tickets...">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option>Todas las categorías</option>
                                <option>Soporte</option>
                                <option>Hosting</option>
                                <option>Oportuno</option>
                                <option>Otros</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option>Todos los estados</option>
                                <option>Abierto</option>
                                <option>En Progreso</option>
                                <option>Resuelto</option>
                                <option>Cerrado</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Cliente</th>
                                    <th>Categoría</th>
                                    <th>Estado</th>
                                    <th>Agente Asignado</th>
                                    <th>Prioridad</th>
                                    <th>Fecha Creación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="ticketsTableBody">
                                <tr>
                                    <td>#00123</td>
                                    <td>Error en el sistema de facturación</td>
                                    <td>Empresa ABC S.A.</td>
                                    <td><span class="badge badge-soporte">Soporte</span></td>
                                    <td><span class="status-badge status-progress">En Progreso</span></td>
                                    <td><span class="agent-chip"><i class="fas fa-circle agent-online"></i> Juan Pérez</span></td>
                                    <td><span class="badge bg-danger">Alta</span></td>
                                    <td>2024-01-15</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarTicket('#00123')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#00122</td>
                                    <td>Nueva solicitud de hosting</td>
                                    <td>Tech Solutions</td>
                                    <td><span class="badge badge-hosting">Hosting</span></td>
                                    <td><span class="status-badge status-open">Abierto</span></td>
                                    <td><span class="agent-chip"><i class="fas fa-circle agent-offline"></i> Sin asignar</span></td>
                                    <td><span class="badge bg-warning">Media</span></td>
                                    <td>2024-01-14</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarTicket('#00122')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#00121</td>
                                    <td>Actualización de póliza</td>
                                    <td>Global Corp</td>
                                    <td><span class="badge badge-oportuno">Oportuno</span></td>
                                    <td><span class="status-badge status-resolved">Resuelto</span></td>
                                    <td><span class="agent-chip"><i class="fas fa-circle agent-online"></i> María García</span></td>
                                    <td><span class="badge bg-success">Baja</span></td>
                                    <td>2024-01-13</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarTicket('#00121')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Clientes Page -->
            <div id="clientes-page" class="page-content" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Gestión de Clientes</h2>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#clienteModal">
                        <i class="fas fa-plus me-2"></i>Nuevo Cliente
                    </button>
                </div>

                <div class="table-container">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" class="form-control" placeholder="Buscar clientes...">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option>Todos los clientes</option>
                                <option>Activos</option>
                                <option>Inactivos</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Empresa</th>
                                    <th>Contacto</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="clientesTableBody">
                                <tr>
                                    <td>C001</td>
                                    <td>Empresa ABC S.A.</td>
                                    <td>Juan Pérez</td>
                                    <td>juan@empresaabc.com</td>
                                    <td>+1 (555) 123-4567</td>
                                    <td><span class="badge bg-success">Activo</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarCliente('C001')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>C002</td>
                                    <td>Tech Solutions</td>
                                    <td>María García</td>
                                    <td>maria@techsolutions.com</td>
                                    <td>+1 (555) 234-5678</td>
                                    <td><span class="badge bg-success">Activo</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarCliente('C002')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>C003</td>
                                    <td>Global Corp</td>
                                    <td>Carlos López</td>
                                    <td>carlos@globalcorp.com</td>
                                    <td>+1 (555) 345-6789</td>
                                    <td><span class="badge bg-success">Activo</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarCliente('C003')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Pólizas Page -->
            <div id="polizas-page" class="page-content" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Gestión de Pólizas</h2>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#polizaModal">
                        <i class="fas fa-plus me-2"></i>Nueva Póliza
                    </button>
                </div>

                <div class="table-container">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" class="form-control" placeholder="Buscar pólizas...">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option>Todas las pólizas</option>
                                <option>Vigentes</option>
                                <option>Por vencer</option>
                                <option>Vencidas</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Tipo</th>
                                    <th>Vigencia</th>
                                    <th>Próximo Vencimiento</th>
                                    <th>Monto</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="polizasTableBody">
                                <tr>
                                    <td>P001</td>
                                    <td>Empresa ABC S.A.</td>
                                    <td>Tecnología</td>
                                    <td>2024-01-01</td>
                                    <td>2024-12-31</td>
                                    <td>$5,000.00</td>
                                    <td><span class="badge bg-success">Vigente</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarPoliza('P001')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>P002</td>
                                    <td>Tech Solutions</td>
                                    <td>Seguro</td>
                                    <td>2024-01-01</td>
                                    <td>2024-06-30</td>
                                    <td>$2,500.00</td>
                                    <td><span class="badge bg-warning">Por Vencer</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarPoliza('P002')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>P003</td>
                                    <td>Global Corp</td>
                                    <td>Mantenimiento</td>
                                    <td>2023-07-01</td>
                                    <td>2024-06-30</td>
                                    <td>$3,200.00</td>
                                    <td><span class="badge bg-success">Vigente</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarPoliza('P003')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Agentes Page -->
            <div id="agentes-page" class="page-content" style="display: none;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Gestión de Agentes</h2>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#agenteModal">
                        <i class="fas fa-plus me-2"></i>Nuevo Agente
                    </button>
                </div>

                <div class="table-container">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" class="form-control" placeholder="Buscar agentes...">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option>Todos los agentes</option>
                                <option>Disponibles</option>
                                <option>Ocupados</option>
                                <option>Offline</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option>Todas las especialidades</option>
                                <option>Soporte</option>
                                <option>Hosting</option>
                                <option>Tecnología</option>
                                <option>General</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Especialidad</th>
                                    <th>Estado</th>
                                    <th>Tickets Asignados</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="agentesTableBody">
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="user-avatar me-2">J</div>
                                            <div>
                                                <div class="fw-bold">Juan Pérez</div>
                                                <small class="text-muted">juan@ticketpro.com</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>juan@ticketpro.com</td>
                                    <td><span class="role-badge role-agent">Agente</span></td>
                                    <td><span class="badge bg-info">Soporte</span></td>
                                    <td><span class="agent-status agent-online">Online</span></td>
                                    <td><span class="badge bg-primary">12</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarAgente('A001')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="user-avatar me-2">M</div>
                                            <div>
                                                <div class="fw-bold">María García</div>
                                                <small class="text-muted">maria@ticketpro.com</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>maria@ticketpro.com</td>
                                    <td><span class="role-badge role-agent">Agente</span></td>
                                    <td><span class="badge bg-info">Hosting</span></td>
                                    <td><span class="agent-status agent-online">Online</span></td>
                                    <td><span class="badge bg-primary">8</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarAgente('A002')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="user-avatar me-2">C</div>
                                            <div>
                                                <div class="fw-bold">Carlos López</div>
                                                <small class="text-muted">carlos@ticketpro.com</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>carlos@ticketpro.com</td>
                                    <td><span class="role-badge role-manager">Gerente</span></td>
                                    <td><span class="badge bg-info">General</span></td>
                                    <td><span class="agent-status agent-busy">Busy</span></td>
                                    <td><span class="badge bg-primary">5</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarAgente('A003')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Agent Performance -->
                <div class="row mt-4">
                    <div class="col-lg-6 mb-4">
                        <div class="form-container">
                            <h5 class="mb-3">Rendimiento de Agentes</h5>
                            <canvas id="agentPerformanceChart" height="200"></canvas>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="form-container">
                            <h5 class="mb-3">Tickets por Agente</h5>
                            <canvas id="agentTicketsChart" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Permisos Page -->
            <div id="permisos-page" class="page-content" style="display: none;">
                <h2 class="mb-4">Configuración de Permisos</h2>
                
                <div class="row">
                    <div class="col-lg-4 mb-4">
                        <div class="form-container">
                            <h5 class="mb-3">Roles</h5>
                            <div class="mb-3">
                                <button class="btn btn-primary w-100 mb-2" onclick="addNewRole()">
                                    <i class="fas fa-plus me-2"></i>Nuevo Rol
                                </button>
                                <div id="rolesList">
                                    <div class="permission-item">
                                        <div class="permission-header">
                                            <span><strong>Administrador</strong></span>
                                            <span class="badge bg-danger">Superusuario</span>
                                        </div>
                                        <p class="text-muted mb-2">Acceso total al sistema</p>
                                        <button class="btn btn-sm btn-outline-primary">Editar Permisos</button>
                                    </div>
                                    <div class="permission-item">
                                        <div class="permission-header">
                                            <span><strong>Gerente</strong></span>
                                            <span class="badge bg-success">Gerente</span>
                                        </div>
                                        <p class="text-muted mb-2">Gestión de equipo y reportes</p>
                                        <button class="btn btn-sm btn-outline-primary">Editar Permisos</button>
                                    </div>
                                    <div class="permission-item">
                                        <div class="permission-header">
                                            <span><strong>Agente</strong></span>
                                            <span class="badge bg-primary">Agente</span>
                                        </div>
                                        <p class="text-muted mb-2">Gestión de tickets asignados</p>
                                        <button class="btn btn-sm btn-outline-primary">Editar Permisos</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 mb-4">
                        <div class="form-container">
                            <h5 class="mb-3">Permisos por Módulo</h5>
                            <div class="permission-grid">
                                <div class="permission-item">
                                    <div class="permission-header">
                                        <span><strong>Tickets</strong></span>
                                        <label class="permission-toggle">
                                            <input type="checkbox" checked>
                                            <span class="permission-slider"></span>
                                        </label>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Ver tickets</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Crear tickets</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Editar tickets</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Eliminar tickets</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="permission-item">
                                    <div class="permission-header">
                                        <span><strong>Clientes</strong></span>
                                        <label class="permission-toggle">
                                            <input type="checkbox" checked>
                                            <span class="permission-slider"></span>
                                        </label>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Ver clientes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Crear clientes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Editar clientes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Eliminar clientes</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="permission-item">
                                    <div class="permission-header">
                                        <span><strong>Agentes</strong></span>
                                        <label class="permission-toggle">
                                            <input type="checkbox">
                                            <span class="permission-slider"></span>
                                        </label>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Ver agentes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Crear agentes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Editar agentes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Eliminar agentes</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="permission-item">
                                    <div class="permission-header">
                                        <span><strong>Pólizas</strong></span>
                                        <label class="permission-toggle">
                                            <input type="checkbox" checked>
                                            <span class="permission-slider"></span>
                                        </label>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Ver pólizas</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Crear pólizas</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Editar pólizas</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Eliminar pólizas</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="permission-item">
                                    <div class="permission-header">
                                        <span><strong>Reportes</strong></span>
                                        <label class="permission-toggle">
                                            <input type="checkbox" checked>
                                            <span class="permission-slider"></span>
                                        </label>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Ver reportes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Generar reportes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Exportar reportes</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Programar reportes</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="permission-item">
                                    <div class="permission-header">
                                        <span><strong>Configuración</strong></span>
                                        <label class="permission-toggle">
                                            <input type="checkbox">
                                            <span class="permission-slider"></span>
                                        </label>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <label class="form-check-label">Ver configuración</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Editar configuración</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Gestionar usuarios</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <label class="form-check-label">Gestionar permisos</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-4">
                                <button class="btn btn-primary" onclick="guardarPermisos()">
                                    <i class="fas fa-save me-2"></i>Guardar Permisos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reportes Page -->
            <div id="reportes-page" class="page-content" style="display: none;">
                <h2 class="mb-4">Reportes</h2>
                
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="form-container">
                            <h5 class="mb-3">Generar Reporte</h5>
                            <form id="reportForm">
                                <div class="mb-3">
                                    <label class="form-label">Tipo de Reporte</label>
                                    <select class="form-select" id="reportType">
                                        <option value="semanal">Semanal</option>
                                        <option value="mensual">Mensual</option>
                                        <option value="anual">Anual</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Cliente</label>
                                    <select class="form-select" id="reportCliente">
                                        <option value="todos">Todos los clientes</option>
                                        <option value="empresa-abc">Empresa ABC S.A.</option>
                                        <option value="tech-solutions">Tech Solutions</option>
                                        <option value="global-corp">Global Corp</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Agente</label>
                                    <select class="form-select" id="reportAgente">
                                        <option value="todos">Todos los agentes</option>
                                        <option value="juan-perez">Juan Pérez</option>
                                        <option value="maria-garcia">María García</option>
                                        <option value="carlos-lopez">Carlos López</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Rango de Fechas</label>
                                    <input type="date" class="form-control" id="fechaInicio">
                                    <input type="date" class="form-control mt-2" id="fechaFin">
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-file-pdf me-2"></i>Generar PDF
                                    </button>
                                    <button type="button" class="btn btn-outline-primary" onclick="enviarReporteEmail()">
                                        <i class="fas fa-envelope me-2"></i>Enviar por Email
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-container">
                            <h5 class="mb-3">Configuración Automática</h5>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="autoSemanal">
                                        <label class="form-check-label" for="autoSemanal">
                                            Reporte Semanal Automático
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="autoMensual">
                                        <label class="form-check-label" for="autoMensual">
                                            Reporte Mensual Automático
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Email Destino (Semanal)</label>
                                    <input type="email" class="form-control" placeholder="admin@empresa.com">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Email Destino (Mensual)</label>
                                    <input type="email" class="form-control" placeholder="gerente@empresa.com">
                                </div>
                            </div>
                            <button class="btn btn-primary" onclick="guardarConfiguracionReportes()">
                                <i class="fas fa-save me-2"></i>Guardar Configuración
                            </button>
                        </div>
                    </div>
                </div>

                <div class="chart-container">
                    <h5 class="mb-3">Estadísticas de Reportes</h5>
                    <canvas id="reportesChart"></canvas>
                </div>
            </div>

            <!-- Configuración Page -->
            <div id="configuracion-page" class="page-content" style="display: none;">
                <h2 class="mb-4">Configuración</h2>
                
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="form-container">
                            <h5 class="mb-3">Configuración de Correo</h5>
                            <form id="correoForm">
                                <div class="mb-3">
                                    <label class="form-label">Servidor SMTP</label>
                                    <input type="text" class="form-control" placeholder="smtp.gmail.com" value="smtp.gmail.com">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Puerto</label>
                                    <input type="number" class="form-control" placeholder="587" value="587">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email Saliente</label>
                                    <input type="email" class="form-control" placeholder="tickets@empresa.com" value="tickets@empresa.com">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" placeholder="••••••••">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email para Copias</label>
                                    <input type="email" class="form-control" placeholder="admin@empresa.com">
                                </div>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save me-2"></i>Guardar Configuración
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="form-container">
                            <h5 class="mb-3">Configuración General</h5>
                            <form id="generalForm">
                                <div class="mb-3">
                                    <label class="form-label">Nombre de la Empresa</label>
                                    <input type="text" class="form-control" value="TicketPro S.A.">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Dirección</label>
                                    <input type="text" class="form-control" value="Av. Principal 123, Ciudad">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Teléfono</label>
                                    <input type="text" class="form-control" value="+1 (555) 123-4567">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email Soporte</label>
                                    <input type="email" class="form-control" value="soporte@ticketpro.com">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Zona Horaria</label>
                                    <select class="form-select">
                                        <option selected>America/Mexico_City</option>
                                        <option>America/Argentina/Buenos_Aires</option>
                                        <option>Europe/Madrid</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save me-2"></i>Guardar Configuración
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Ticket Modal -->
<div class="modal fade" id="ticketModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Nuevo Ticket</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="ticketForm">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Título</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Cliente</label>
                            <select class="form-select" id="clienteSelect" required>
                                <option value="">Cargando clientes...</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Categoría</label>
                            <select class="form-select" required>
                                <option value="">Seleccionar categoría</option>
                                <option value="soporte">Soporte</option>
                                <option value="hosting">Hosting</option>
                                <option value="oportuno">Oportuno</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Prioridad</label>
                            <select class="form-select" required>
                                <option value="">Seleccionar prioridad</option>
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Asignar Agente</label>
                        <select class="form-select" id="agenteSelect">
                            <option value="">Sin asignar</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <textarea class="form-control" rows="4" required></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" form="ticketForm" class="btn btn-primary">Guardar Ticket</button>
            </div>
        </div>
    </div>
</div>

    <!-- Cliente Modal -->
    <div class="modal fade" id="clienteModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Nuevo Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="clienteForm">
                    <div class="mb-3">
                        <label class="form-label">Empresa</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Contacto</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Teléfono</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Dirección</label>
                        <textarea class="form-control" rows="2"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" form="clienteForm" class="btn btn-primary">Guardar Cliente</button>
            </div>
        </div>
    </div>
</div>

    <!-- Agente Modal -->
  <div class="modal fade" id="agenteModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Nuevo Agente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="agenteForm">
                    <div class="mb-3">
                        <label class="form-label">Nombre Completo</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Teléfono</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Rol</label>
                        <select class="form-select" required>
                            <option value="">Seleccionar rol</option>
                            <option value="agente">Agente</option>
                            <option value="gerente">Gerente</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Especialidad</label>
                        <select class="form-select" required>
                            <option value="">Seleccionar especialidad</option>
                            <option value="soporte">Soporte</option>
                            <option value="hosting">Hosting</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input type="password" class="form-control" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" form="agenteForm" class="btn btn-primary">Guardar Agente</button>
            </div>
        </div>
    </div>
</div>

    <!-- Poliza Modal -->
<div class="modal fade" id="polizaModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Nueva Póliza</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="polizaForm">
                    <div class="mb-3">
                        <label class="form-label">Cliente</label>
                        <select class="form-select" id="polizaClienteSelect" required>
                            <option value="">Cargando clientes...</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Tipo de Póliza</label>
                        <select class="form-select" required>
                            <option value="">Seleccionar tipo</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="seguro">Seguro</option>
                            <option value="mantenimiento">Mantenimiento</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Vigencia Inicio</label>
                            <input type="date" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Vigencia Fin</label>
                            <input type="date" class="form-control" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Monto</label>
                        <input type="number" class="form-control" step="0.01" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" form="polizaForm" class="btn btn-primary">Guardar Póliza</button>
            </div>
        </div>
    </div>
</div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Sample data
        let tickets = [
            { id: '#00123', title: 'Error en el sistema de facturación', cliente: 'Empresa ABC S.A.', categoria: 'Soporte', estado: 'En Progreso', prioridad: 'Alta', agente: 'Juan Pérez', fecha: '2024-01-15' },
            { id: '#00122', title: 'Nueva solicitud de hosting', cliente: 'Tech Solutions', categoria: 'Hosting', estado: 'Abierto', prioridad: 'Media', agente: 'Sin asignar', fecha: '2024-01-14' },
            { id: '#00121', title: 'Actualización de póliza', cliente: 'Global Corp', categoria: 'Oportuno', estado: 'Resuelto', prioridad: 'Baja', agente: 'María García', fecha: '2024-01-13' }
        ];

        let clientes = [
            { id: 'C001', empresa: 'Empresa ABC S.A.', contacto: 'Juan Pérez', email: 'juan@empresaabc.com', telefono: '+1 (555) 123-4567', estado: 'Activo' },
            { id: 'C002', empresa: 'Tech Solutions', contacto: 'María García', email: 'maria@techsolutions.com', telefono: '+1 (555) 234-5678', estado: 'Activo' },
            { id: 'C003', empresa: 'Global Corp', contacto: 'Carlos López', email: 'carlos@globalcorp.com', telefono: '+1 (555) 345-6789', estado: 'Activo' }
        ];

        let polizas = [
            { id: 'P001', cliente: 'Empresa ABC S.A.', tipo: 'Tecnología', vigencia: '2024-01-01', vencimiento: '2024-12-31', monto: '$5,000.00', estado: 'Vigente' },
            { id: 'P002', cliente: 'Tech Solutions', tipo: 'Seguro', vigencia: '2024-01-01', vencimiento: '2024-06-30', monto: '$2,500.00', estado: 'Por Vencer' },
            { id: 'P003', cliente: 'Global Corp', tipo: 'Mantenimiento', vigencia: '2023-07-01', vencimiento: '2024-06-30', monto: '$3,200.00', estado: 'Vigente' }
        ];

        let agentes = [
            { id: 'A001', nombre: 'Juan Pérez', email: 'juan@ticketpro.com', rol: 'Agente', especialidad: 'Soporte', estado: 'Online', ticketsAsignados: 12 },
            { id: 'A002', nombre: 'María García', email: 'maria@ticketpro.com', rol: 'Agente', especialidad: 'Hosting', estado: 'Online', ticketsAsignados: 8 },
            { id: 'A003', nombre: 'Carlos López', email: 'carlos@ticketpro.com', rol: 'Gerente', especialidad: 'General', estado: 'Busy', ticketsAsignados: 5 },
            { id: 'A004', nombre: 'Ana Martínez', email: 'ana@ticketpro.com', rol: 'Agente', especialidad: 'Tecnología', estado: 'Offline', ticketsAsignados: 3 }
        ];

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Hide all pages
                document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
                
                // Show selected page
                const pageId = this.getAttribute('data-page') + '-page';
                document.getElementById(pageId).style.display = 'block';
                
                // Initialize charts if needed
                if (this.getAttribute('data-page') === 'agentes') {
                    initAgentCharts();
                } else if (this.getAttribute('data-page') === 'dashboard') {
                    initCharts();
                }
            });
        });

        // Toggle sidebar
        document.getElementById('toggleSidebar').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('active');
        });

        // Initialize charts
        function initCharts() {
            // Tickets Evolution Chart
            const ticketsCtx = document.getElementById('ticketsChart');
            if (ticketsCtx) {
                new Chart(ticketsCtx, {
                    type: 'line',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Tickets Abiertos',
                            data: [65, 59, 80, 81, 56, 55],
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            tension: 0.4
                        }, {
                            label: 'Tickets Resueltos',
                            data: [28, 48, 40, 19, 86, 27],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            }
                        }
                    }
                });
            }

            // Category Chart
            const categoryCtx = document.getElementById('categoryChart');
            if (categoryCtx) {
                new Chart(categoryCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Soporte', 'Hosting', 'Oportuno', 'Otros'],
                        datasets: [{
                            data: [45, 25, 20, 10],
                            backgroundColor: ['#2563eb', '#f59e0b', '#10b981', '#64748b']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }

            // Reportes Chart
            const reportesCtx = document.getElementById('reportesChart');
            if (reportesCtx) {
                new Chart(reportesCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Reportes Generados',
                            data: [12, 19, 15, 25, 22, 30],
                            backgroundColor: '#2563eb'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        }

        // Initialize agent charts
        function initAgentCharts() {
            // Agent Performance Chart
            const agentPerfCtx = document.getElementById('agentPerformanceChart');
            if (agentPerfCtx) {
                new Chart(agentPerfCtx, {
                    type: 'radar',
                    data: {
                        labels: ['Resolución', 'Satisfacción', 'Velocidad', 'Precisión', 'Comunicación'],
                        datasets: [{
                            label: 'Juan Pérez',
                            data: [85, 90, 75, 88, 92],
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.2)'
                        }, {
                            label: 'María García',
                            data: [92, 85, 88, 90, 87],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.2)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }

            // Agent Tickets Chart
            const agentTicketsCtx = document.getElementById('agentTicketsChart');
            if (agentTicketsCtx) {
                new Chart(agentTicketsCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Juan', 'María', 'Carlos', 'Ana'],
                        datasets: [{
                            label: 'Tickets Resueltos',
                            data: [45, 38, 25, 15],
                            backgroundColor: '#2563eb'
                        }, {
                            label: 'Tickets Pendientes',
                            data: [8, 5, 3, 2],
                            backgroundColor: '#f59e0b'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        }

        // Delete functions
        function eliminarTicket(id) {
            if (confirm('¿Está seguro de eliminar este ticket?')) {
                showNotification('Ticket eliminado exitosamente', 'success');
            }
        }

        function eliminarCliente(id) {
            if (confirm('¿Está seguro de eliminar este cliente?')) {
                showNotification('Cliente eliminado exitosamente', 'success');
            }
        }

        function eliminarAgente(id) {
            if (confirm('¿Está seguro de eliminar este agente?')) {
                showNotification('Agente eliminado exitosamente', 'success');
            }
        }

        function eliminarPoliza(id) {
            if (confirm('¿Está seguro de eliminar esta póliza?')) {
                showNotification('Póliza eliminada exitosamente', 'success');
            }
        }

        // Permission functions
        function addNewRole() {
            showNotification('Función de agregar nuevo rol en desarrollo', 'info');
        }

        function guardarPermisos() {
            showNotification('Permisos guardados exitosamente', 'success');
        }

        // Report functions
        function enviarReporteEmail() {
            showNotification('Reporte enviado por email exitosamente', 'success');
        }

        function guardarConfiguracionReportes() {
            showNotification('Configuración de reportes guardada exitosamente', 'success');
        }

        // Form submissions for configuration
        document.getElementById('correoForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Configuración de correo guardada exitosamente', 'success');
        });

        document.getElementById('generalForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Configuración general guardada exitosamente', 'success');
        });

        // Notification function
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
            notification.style.zIndex = '9999';
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Initialize on load
        document.addEventListener('DOMContentLoaded', function() {
            initCharts();
        });
    </script>
</body>
</html>

