-- -- =========================================
-- -- Tablas maestras
-- -- =========================================


-- -- Estado de la maquinaria (machinery_status)
-- CREATE TABLE machinery_status (
--     status_id SMALLSERIAL PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL
-- );

-- -- Categoria de la maquinaria (machinery_categories)
-- CREATE TABLE machinery_categories (
--     category_id SERIAL PRIMARY KEY,
--     category_name VARCHAR(50) NOT NULL
-- );

-- -- Roles (roles)
-- CREATE TABLE roles (
--     role_id SMALLSERIAL PRIMARY KEY,
--     role_name VARCHAR(50) NOT NULL,
--     role_status BOOLEAN NOT NULL DEFAULT TRUE
-- );

-- -- Permisos (permissions)
-- CREATE TABLE permissions (
--     permission_id SERIAL PRIMARY KEY,
--     permission_name VARCHAR(50) NOT NULL UNIQUE
-- );

-- -- Estado de pedido (order_status)
-- CREATE TABLE order_status (
--     order_status_id SMALLSERIAL PRIMARY KEY,
--     order_status_name VARCHAR(50) NOT NULL
-- );

-- -- Tipo de cobros (charge_types)
-- CREATE TABLE charge_types (
--     charge_type_id SERIAL PRIMARY KEY,
--     charge_type_name VARCHAR(100) NOT NULL
-- );

-- -- Cargos (positions)
-- CREATE TABLE positions (
--     position_id SMALLSERIAL PRIMARY KEY,
--     position_name VARCHAR(50) NOT NULL
-- );

-- -- Proveedores (suppliers)
-- CREATE TABLE suppliers (
--     supplier_id SERIAL PRIMARY KEY,
--     document_type VARCHAR(20) NOT NULL,
--     document_number VARCHAR(20) UNIQUE NOT NULL,
--     supplier_status BOOLEAN NOT NULL,
--     supplier_name VARCHAR(100) NOT NULL,
--     supplier_address VARCHAR(100),
--     supplier_phone VARCHAR(20),
--     supplier_email VARCHAR(100),
--     supplier_state VARCHAR(100) NOT NULL,
--     supplier_city VARCHAR(100) NOT NULL
-- );

-- -- Vehiculos (vehicles)
-- CREATE TABLE vehicles (
--     vehicle_id SMALLSERIAL PRIMARY KEY,
--     vehicle_status BOOLEAN NOT NULL,
--     vehicle_brand VARCHAR(70) NOT NULL,
--     vehicle_model VARCHAR(70) NOT NULL,
--     license_plate VARCHAR(7) NOT NULL UNIQUE,
--     capacity_kg DECIMAL(8,2) NOT NULL
-- );

-- -- Clientes (customers)
-- CREATE TABLE customers (
--     customer_id SERIAL PRIMARY KEY,
--     customer_document_type VARCHAR(20) NOT NULL,
--     customer_document_number VARCHAR(20) NOT NULL UNIQUE,
--     customer_status BOOLEAN NOT NULL,
--     customer_first_name VARCHAR(70) NOT NULL,
--     customer_last_name VARCHAR(70) NOT NULL,
--     customer_address VARCHAR(100),
--     customer_phone VARCHAR(20) NOT NULL,
--     customer_email VARCHAR(100),
--     organization_type VARCHAR(20) NOT NULL
-- 	);



-- -- =========================================
-- -- Tablas con dependencias
-- -- =========================================


-- -- Empleados (employees)
-- CREATE TABLE employees (
--     employee_id SERIAL PRIMARY KEY,
--     employee_document_type VARCHAR(20) NOT NULL,
--     employee_document_number VARCHAR(20) NOT NULL UNIQUE,
--     employee_status BOOLEAN NOT NULL,
--     employee_first_name VARCHAR(70) NOT NULL,
--     employee_last_name VARCHAR(70) NOT NULL,
--     employee_email VARCHAR(100) NOT NULL UNIQUE,
--     employee_phone VARCHAR(20) NOT NULL,
--     employee_eps VARCHAR(50) NOT NULL,
--     position_id SMALLINT NOT NULL,

--     CONSTRAINT fk_employee_position
--         FOREIGN KEY (position_id)
--         REFERENCES positions(position_id)
-- );

-- -- Usuarios (users)
-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     user_email VARCHAR(100) NOT NULL UNIQUE,
--     user_password VARCHAR(255) NOT NULL,
--     user_status BOOLEAN NOT NULL DEFAULT true,
--     role_id SMALLINT NOT NULL,
--     employee_id INT NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--     CONSTRAINT fk_user_role
--         FOREIGN KEY (role_id)
--         REFERENCES roles(role_id),

--     CONSTRAINT fk_user_employee
--         FOREIGN KEY (employee_id)
--         REFERENCES employees(employee_id)
-- );

-- -- Roles-permisos (role_permissions)
-- CREATE TABLE role_permissions (
--     role_permission_id SERIAL PRIMARY KEY,
--     role_id SMALLINT NOT NULL,
--     permission_id INT NOT NULL,

--     CONSTRAINT fk_role_permissions_role
--         FOREIGN KEY (role_id)
--         REFERENCES roles(role_id)
--         ON DELETE CASCADE,

--     CONSTRAINT fk_role_permissions_permission
--         FOREIGN KEY (permission_id)
--         REFERENCES permissions(permission_id)
--         ON DELETE CASCADE
-- );

-- -- Proyectos (projects)
-- CREATE TABLE projects (
--     project_id SERIAL PRIMARY KEY,
--     project_status BOOLEAN NOT NULL,
--     customer_id INT NOT NULL,
--     project_name VARCHAR(50) NOT NULL,
--     project_address VARCHAR(100),
--     project_phone VARCHAR(20) NOT NULL,
--     project_city VARCHAR(100) NOT NULL,

--     CONSTRAINT fk_project_customer
--         FOREIGN KEY (customer_id)
--         REFERENCES customers(customer_id)
-- );

-- -- Maquinaria (machinery)
-- CREATE TABLE machinery (
--     machinery_id SERIAL PRIMARY KEY,
--     status_id SMALLINT NOT NULL,
--     category_id INT NOT NULL,
--     next_revision_date DATE,
--     machinery_name VARCHAR(100) NOT NULL,
--     is_motorized BOOLEAN NOT NULL,
--     sale_price DECIMAL(12,2) NOT NULL,
--     daily_rental_price DECIMAL(9,2) NOT NULL,
--     weight_kg DECIMAL(8,2),
--     stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
--     is_owned BOOLEAN NOT NULL,
--     machinery_description VARCHAR(1000) NOT NULL,

--     CONSTRAINT fk_machinery_status
--         FOREIGN KEY (status_id)
--         REFERENCES machinery_status(status_id),

--     CONSTRAINT fk_machinery_category
--         FOREIGN KEY (category_id)
--         REFERENCES machinery_categories(category_id)
-- );

-- -- Mantenimientos (maintenances)
-- CREATE TABLE maintenances (
--     maintenance_id SERIAL PRIMARY KEY,
--     machinery_id INT NOT NULL,
--     maintenance_date DATE NOT NULL,
--     revision_notes VARCHAR(500),

--     CONSTRAINT fk_maintenance_machinery
--         FOREIGN KEY (machinery_id)
--         REFERENCES machinery(machinery_id)
-- );

-- -- Subalquileres (sub_rentals)
-- CREATE TABLE sub_rentals ( 
--     sub_rental_id SERIAL PRIMARY KEY,
--     machinery_id INT NOT NULL,
--     supplier_id INT NOT NULL,
--     supplier_cost DECIMAL(9,2) NOT NULL,
--     sub_rental_status BOOLEAN NOT NULL,

--     CONSTRAINT fk_sub_rental_machinery
--         FOREIGN KEY (machinery_id)
--         REFERENCES machinery(machinery_id),

--     CONSTRAINT fk_sub_rental_supplier
--         FOREIGN KEY (supplier_id)
--         REFERENCES suppliers(supplier_id)
-- );

-- -- Facturas de compras (purchase_invoices)
-- CREATE TABLE purchase_invoices (
--     invoice_id SERIAL PRIMARY KEY,
--     supplier_id INT NOT NULL,
--     purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     invoice_photo BYTEA,

--     CONSTRAINT fk_invoice_supplier
--         FOREIGN KEY (supplier_id)
--         REFERENCES suppliers(supplier_id)
-- );

-- -- Pedidos (orders)
-- CREATE TABLE orders (
--     order_id SERIAL PRIMARY KEY,
--     order_creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     order_closing_date TIMESTAMP,
--     project_id INT NOT NULL,
--     order_status_id SMALLINT NOT NULL,
--     user_id INT NOT NULL,
--     discount_amount DECIMAL(9,2) DEFAULT 0.00,
--     order_description VARCHAR(500),

--     CONSTRAINT fk_order_project
--         FOREIGN KEY (project_id)
--         REFERENCES projects(project_id),

--     CONSTRAINT fk_order_status
--         FOREIGN KEY (order_status_id)
--         REFERENCES order_status(order_status_id),

--     CONSTRAINT fk_order_user
--         FOREIGN KEY (user_id)
--         REFERENCES users(user_id)
-- );

-- -- Detalles de pedidos (order_details)
-- CREATE TABLE order_details (
--     order_detail_id BIGSERIAL PRIMARY KEY,
--     order_id INT NOT NULL,
--     machinery_id INT NOT NULL,
--     machinery_name_snapshot VARCHAR(100),
--     quantity_to_dispatch INT NOT NULL CHECK (quantity_to_dispatch > 0),
--     rental_unit_price DECIMAL(9,2) NOT NULL,
--     machinery_rental_status BOOLEAN DEFAULT TRUE,
--     subtotal_weight_kg DECIMAL(8,2),

--     CONSTRAINT fk_order_detail_order
--         FOREIGN KEY (order_id)
--         REFERENCES orders(order_id)
--         ON DELETE CASCADE,

--     CONSTRAINT fk_order_detail_machinery
--         FOREIGN KEY (machinery_id)
--         REFERENCES machinery(machinery_id)
-- );

-- -- Devoluciones (returns)
-- CREATE TABLE returns (
--     return_id BIGSERIAL PRIMARY KEY,
--     return_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     returned_quantity INT NOT NULL CHECK (returned_quantity > 0),
--     return_notes VARCHAR(500),
--     order_detail_id BIGINT NOT NULL,

--     CONSTRAINT fk_return_order_detail
--         FOREIGN KEY (order_detail_id)
--         REFERENCES order_details(order_detail_id)
-- );

-- -- Cobros adicionales (additional_charges)
-- CREATE TABLE additional_charges (
--     additional_charge_id SERIAL PRIMARY KEY,
--     charge_type_id INT NOT NULL,
--     return_id BIGINT NOT NULL,
--     charge_description VARCHAR(100),
--     charge_amount DECIMAL(9,2) NOT NULL CHECK (charge_amount >= 0),

--     CONSTRAINT fk_additional_charge_type
--         FOREIGN KEY (charge_type_id)
--         REFERENCES charge_types(charge_type_id),

--     CONSTRAINT fk_additional_charge_return
--         FOREIGN KEY (return_id)
--         REFERENCES returns(return_id)
-- );

-- -- Abonos (payments)
-- CREATE TABLE payments (
--     payment_id SERIAL PRIMARY KEY,
--     order_id INT NOT NULL,
--     payment_amount DECIMAL(9,2) NOT NULL CHECK (payment_amount > 0),
--     payment_method VARCHAR(30) NOT NULL,
--     payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,

--     CONSTRAINT fk_payment_order
--         FOREIGN KEY (order_id)
--         REFERENCES orders(order_id)
-- );

-- -- Vehiculos-cobros (vehicle_charges)
-- CREATE TABLE vehicle_charges (
--     vehicle_charge_id SERIAL PRIMARY KEY,
--     vehicle_id SMALLINT NOT NULL,
--     additional_charge_id INT NOT NULL,

--     CONSTRAINT fk_vehicle_charge_vehicle
--         FOREIGN KEY (vehicle_id)
--         REFERENCES vehicles(vehicle_id),

--     CONSTRAINT fk_vehicle_charge_additional_charge
--         FOREIGN KEY (additional_charge_id)
--         REFERENCES additional_charges(additional_charge_id)
-- );






-- TRUNCATE TABLE role_permissions, users, employees, roles, order_status, positions, permissions RESTART IDENTITY CASCADE;
-- -- ==========================================================
-- -- DATOS QUEMADOS
-- -- ==========================================================
-- -- ==========================================================
-- -- 1. DATOS MAESTROS BÁSICOS
-- -- ==========================================================

-- -- Roles de sistema
-- INSERT INTO roles (role_id, role_name, role_status) 
-- VALUES (1, 'Administrador', true), (2, 'Asesor', true);

-- -- Estados posibles para los pedidos
-- INSERT INTO order_status (order_status_name) 
-- VALUES ('Creado'), ('En proceso'), ('Cancelado'), ('Cerrado');

-- -- Cargos dentro de la empresa
-- INSERT INTO positions (position_name) 
-- VALUES ('Desarrollador');


-- -- ==========================================================
-- -- 2. EMPLEADOS (Usuarios del sistema)
-- -- ==========================================================

-- -- Registramos los 4 empleados (Incluyendo el de prueba)
-- INSERT INTO employees (employee_document_type, employee_document_number, employee_status, employee_first_name, employee_last_name, employee_email, employee_phone, employee_eps, position_id)
-- VALUES 
-- ('CC', '1025647253', TRUE, 'Juan Diego', 'Rios Restrepo', 'juanriosr7526@gmail.com', '3052264211', 'Sura', 1),
-- ('CC', '1020114536', TRUE, 'Sara Camila', 'Ortiz Higuita', 'sara@gmail.com', '3054081703', 'Sura', 1),
-- ('CC', '103213213', TRUE, 'Mariana', 'Figueroa Cardona', 'mariana@gmail.com', '3117384156', 'Sura', 1),
-- ('CC', '999888777', TRUE, 'Usuario', 'Prueba', 'prueba@gmail.com', '3000000000', 'Sura', 1);




-- -- ==========================================================
-- -- 3. CUENTAS DE USUARIO (Acceso al sistema)
-- -- ==========================================================

-- -- Asignamos los roles: 1 = Admin, 2 = Asesor
-- INSERT INTO users (user_email, user_password, user_status, role_id, employee_id) 
-- VALUES 
-- ('rios@gmail.com', '$2b$10$tvhRa6clQU/a93QkRtllYO8l7CJBpOj3g12AfPk0VVXyG34rJEcAu', true, 1, 1), -- Admin
-- ('sara@gmail.com', '$2b$10$ODpcGe.lD8NqIsVFIWL1OufTzmPuICg8HzMU9ax4ROPePZLU4cLim', true, 1, 2), -- Admin
-- ('mariana@gmail.com', '$2b$10$1Sct7Aomfd.CT053zqvEU.GQAB3LHvOmxAcnekXK1Jq5epws1YaYO', true, 1, 3), -- Admin
-- ('prueba@gmail.com', '$2b$10$wI5Y5q.Q5G3oW4qM5K.T.uey5.5v2oV5P3aKqYj2gXp9l4XQ4V.q.', true, 2, 4); -- Asesor

-- -- ==========================================================
-- -- 3.5. CARGAR PERMISOS EN EL SISTEMA cargo
-- -- ==========================================================
-- -- INSERT INTO permissions (permission_name) VALUES 
-- -- ('Listar Mantenimientos'), ('Crear Mantenimiento'), ('Ver Detalle Mantenimiento'), ('Editar Mantenimiento'), ('Eliminar Mantenimiento'),
-- -- ('Listar Detalles de Orden'), ('Crear Detalle de Orden'), ('Listar Detalles de Orden en Tabla'), ('Ver Detalle de Orden'), ('Editar Detalle de Orden'), ('Eliminar Detalle de Orden'),
-- -- ('Listar Ordenes'), ('Crear Orden'), ('Listar Ordenes en Tabla'), ('Ver Detalle Completo de Orden'), ('Editar Orden'), ('Eliminar Orden'), ('Crear Orden Completa'),
-- -- ('Listar Estados de Orden'), ('Crear Estado de Orden'), ('Ver Detalle de Estado de Orden'), ('Editar Estado de Orden'), ('Eliminar Estado de Orden'),
-- -- ('Listar Pagos'), ('Crear Pago'), ('Listar Pagos en Tabla'), ('Ver Detalle de Pago'), ('Editar Pago'), ('Eliminar Pago'),
-- -- ('Listar Tipos de Cargo'), ('Crear Tipo de Cargo'), ('Ver Tipo de Cargo'), ('Editar Tipo de Cargo'), ('Eliminar Tipo de Cargo'),
-- -- ('Listar Proyectos'), ('Crear Proyecto'), ('Ver Detalle de Proyecto'), ('Editar Proyecto'), ('Eliminar Proyecto'),
-- -- ('Listar Facturas de Compra'), ('Crear Factura de Compra'), ('Ver Detalle de Factura de Compra'), ('Editar Factura de Compra'), ('Eliminar Factura de Compra'),
-- -- ('Listar Devoluciones'), ('Crear Devolución'), ('Ver Detalle de Devolución'), ('Editar Devolución'), ('Eliminar Devolución'),
-- -- ('Listar Roles'), ('Crear Roles'), ('Ver Detalle de Rol'), ('Editar Roles'), ('Eliminar Roles'),
-- -- ('Listar Subalquileres'), ('Crear Subalquiler'), ('Ver Detalle de Subalquiler'), ('Editar Subalquiler'), ('Eliminar Subalquiler'),
-- -- ('Listar Proveedores'), ('Crear Proveedor'), ('Ver Detalle de Proveedor'), ('Editar Proveedor'), ('Eliminar Proveedor'),
-- -- ('Listar Usuarios'), ('Crear Usuario'), ('Ver Detalle de Usuario'), ('Editar Usuario'), ('Eliminar Usuario'),
-- -- ('Listar Vehículos'), ('Crear Vehículo'), ('Ver Detalle de Vehículo'), ('Editar Vehículo'), ('Eliminar Vehículo');
-- -- , ('Listar Tipos de Cobro'), ('Crear Tipos de Cobro'), ('Ver Detalle de Tipos de Cobro'), ('Editar Tipos de Cobro'), ('Eliminar Tipos de Cobro')
-- -- ('Listar Categorías de Maquinaria'), ('Crear Categoría de Maquinaria'), ('Ver Detalle de Categoría de Maquinaria'), ('Editar Categoría de Maquinaria'), ('Eliminar Categoría de Maquinaria'),
-- -- ('Listar Estados de Maquinaria'), ('Crear Estado de Maquinaria'), ('Ver Detalle de Estado de Maquinaria'), ('Editar Estado de Maquinaria'), ('Eliminar Estado de Maquinaria'),
-- -- ('Listar Clientes'), ('Crear Cliente'), ('Ver Detalle Cliente'), ('Editar Cliente'), ('Eliminar Cliente'),
-- -- ('Listar Mantenimientos'), ('Crear Mantenimiento'), ('Ver Detalle Mantenimiento'), ('Editar Mantenimiento'), ('Eliminar Mantenimiento');
-- -- faltan ('Listar Maquinaria'), ('Crear Maquinaria'), ('Ver Detalle Maquinaria'), ('Editar Maquinaria'), ('Eliminar Maquinaria');-- ==========================================================


-- --//////////////////////////////////////////////////////////////////////////////////////
-- --     **********************PERMISOS YA VERIFICADOS Y COMPLETOS**********************
-- --//////////////////////////////////////////////////////////////////////////////////////
-- INSERT INTO permissions (permission_name) VALUES 
-- ('Listar Tipo de Cargo'), ('Crear Tipo de Cargo'), ('Ver Detalle Tipo de Cargo'), ('Editar Tipo de Cargo'), ('Eliminar Tipo de Cargo'),
-- ('Listar Clientes'), ('Crear Cliente'), ('Ver Detalle Cliente'), ('Editar Cliente'), ('Eliminar Cliente'),
-- ('Listar Empleados'), ('Crear Empleado'), ('Ver Detalle Empleado'), ('Editar Empleado'), ('Eliminar Empleado'),
-- ('Listar Categorías de Maquinaria'), ('Crear Categoría de Maquinaria'), ('Ver Detalle Categoría de Maquinaria'), ('Editar Categoría de Maquinaria'), ('Eliminar Categoría de Maquinaria'),
-- ('Listar Estados de Maquinaria'), ('Crear Estado de Maquinaria'), ('Ver Detalle Estado de Maquinaria'), ('Editar Estado de Maquinaria'), ('Eliminar Estado de Maquinaria'),
-- ('Listar Maquinaria'), ('Crear Maquinaria'), ('Ver Detalle Maquinaria'), ('Editar Maquinaria'), ('Eliminar Maquinaria'),
-- ('Listar Mantenimientos'), ('Crear Mantenimiento'), ('Ver Detalle Mantenimiento'), ('Editar Mantenimiento'), ('Eliminar Mantenimiento'),
-- ('Listar Detalles de Orden'),('Crear Detalle de Orden'), ('Ver Detalle de Orden'), ('Editar Detalle de Orden'), ('Eliminar Detalle de Orden'),
-- ('Listar Ordenes'), ('Crear Orden'), ('Ver Detalle de Orden'), ('Editar Orden'), ('Eliminar Orden'), ('Crear Orden Completa'),
-- ('Listar Estados de Orden'), ('Crear Estado de Orden'), ('Ver Detalle de Estado de Orden'), ('Editar Estado de Orden'), ('Eliminar Estado de Orden'),
-- ('Listar Pagos'), ('Crear Pago'), ('Ver Detalle de Pago'), ('Editar Pago'), ('Eliminar Pago'),
-- ('Listar Cargo'), ('Crear Cargo'), ('Ver Detalle de Cargo'), ('Editar Cargo'), ('Eliminar Cargo'),
-- ('Listar Proyectos'), ('Crear Proyecto'), ('Ver Detalle de Proyecto'), ('Editar Proyecto'), ('Eliminar Proyecto'),
-- ('Listar Facturas de Compra'), ('Crear Factura de Compra'), ('Ver Detalle de Factura de Compra'), ('Editar Factura de Compra'), ('Eliminar Factura de Compra'), 
-- ('Listar Devoluciones'), ('Crear Devolución'), ('Ver Detalle de Devolución'), ('Editar Devolución'), ('Eliminar Devolución'),
-- ('Listar Roles'), ('Crear Roles'), ('Ver Detalle de Rol'), ('Editar Roles'), ('Eliminar Roles'),
-- ('Listar Subalquileres'), ('Crear Subalquiler'), ('Ver Detalle de Subalquiler'), ('Editar Subalquiler'), ('Eliminar Subalquiler'),
-- ('Listar Proveedores'), ('Crear Proveedor'), ('Ver Detalle de Proveedor'), ('Editar Proveedor'), ('Eliminar Proveedor'),
-- ('Listar Usuarios'), ('Crear Usuario'), ('Ver Detalle de Usuario'), ('Editar Usuario'), ('Eliminar Usuario'),
-- ('Listar Vehículos'), ('Crear Vehículo'), ('Ver Detalle de Vehículo'), ('Editar Vehículo'), ('Eliminar Vehículo'),

-- -- 4. SEGURIDAD: Asignación de Permisos
-- -- ==========================================================

-- -- Limpiamos permisos antiguos
-- TRUNCATE TABLE role_permissions CASCADE;

-- -- Administrador (ID 1): Acceso a todo
-- INSERT INTO role_permissions (role_id, permission_id)
-- SELECT 1, permission_id FROM permissions;

-- -- Asesor (ID 2): Acceso restringido
-- INSERT INTO role_permissions (role_id, permission_id)
-- SELECT 2, permission_id 
-- FROM permissions 
-- WHERE permission_name IN (
--     'Crear Subalquiler', 'Listar Subalquileres', 'Ver Detalle de Subalquiler',
--     'Crear Proyecto', 'Listar Proyectos', 'Ver Detalle de Proyecto',
--     'Listar Maquinaria', 'Ver Detalle Maquinaria',
--     'Listar Categorías de Maquinaria', 'Listar Estados de Maquinaria',
--     'Listar Vehículos', 'Ver Detalle de Vehículo',
--     'Crear Cliente', 'Listar Clientes', 'Ver Detalle Cliente',
--     'Crear Orden', 'Listar Ordenes', 'Ver Detalle de Orden',
--     'Crear Devolución', 'Listar Devoluciones', 'Ver Detalle de Devolución'
-- );


-- SELECT p.permission_name 
-- FROM permissions p
-- JOIN role_permissions rp ON p.permission_id = rp.permission_id
-- WHERE rp.role_id = 1; -- Prueba con 1 (Administrador)

























-- =========================================
-- Tablas maestras
-- =========================================


-- Estado de la maquinaria (machinery_status)
CREATE TABLE machinery_status (
    status_id SMALLSERIAL PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);

-- Categoria de la maquinaria (machinery_categories)
CREATE TABLE machinery_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);

-- Roles (roles)
CREATE TABLE roles (
    role_id SMALLSERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    role_status BOOLEAN NOT NULL DEFAULT TRUE
);

-- Permisos (permissions)
CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(50) NOT NULL UNIQUE
);

-- Estado de pedido (order_status)
CREATE TABLE order_status (
    order_status_id SMALLSERIAL PRIMARY KEY,
    order_status_name VARCHAR(50) NOT NULL
);

-- Tipo de cobros (charge_types)
CREATE TABLE charge_types (
    charge_type_id SERIAL PRIMARY KEY,
    charge_type_name VARCHAR(100) NOT NULL
);

-- Cargos (positions)
CREATE TABLE positions (
    position_id SMALLSERIAL PRIMARY KEY,
    position_name VARCHAR(50) NOT NULL
);

-- Proveedores (suppliers)
CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    document_type VARCHAR(20) NOT NULL,
    document_number VARCHAR(20) UNIQUE NOT NULL,
    supplier_status BOOLEAN NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    supplier_address VARCHAR(100),
    supplier_phone VARCHAR(20),
    supplier_email VARCHAR(100),
    supplier_state VARCHAR(100) NOT NULL,
    supplier_city VARCHAR(100) NOT NULL
);

-- Vehiculos (vehicles)
CREATE TABLE vehicles (
    vehicle_id SMALLSERIAL PRIMARY KEY,
    vehicle_status BOOLEAN NOT NULL,
    vehicle_brand VARCHAR(70) NOT NULL,
    vehicle_model VARCHAR(70) NOT NULL,
    license_plate VARCHAR(7) NOT NULL UNIQUE,
    capacity_kg DECIMAL(8,2) NOT NULL
);

-- Clientes (customers)
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_document_type VARCHAR(20) NOT NULL,
    customer_document_number VARCHAR(20) NOT NULL UNIQUE,
    customer_status BOOLEAN NOT NULL,
    customer_first_name VARCHAR(70) NOT NULL,
    customer_last_name VARCHAR(70) NOT NULL,
    customer_address VARCHAR(100),
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100),
    organization_type VARCHAR(20) NOT NULL
	);



-- =========================================
-- Tablas con dependencias
-- =========================================


-- Empleados (employees)
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_document_type VARCHAR(20) NOT NULL,
    employee_document_number VARCHAR(20) NOT NULL UNIQUE,
    employee_status BOOLEAN NOT NULL,
    employee_first_name VARCHAR(70) NOT NULL,
    employee_last_name VARCHAR(70) NOT NULL,
    employee_email VARCHAR(100) NOT NULL UNIQUE,
    employee_phone VARCHAR(20) NOT NULL,
    employee_eps VARCHAR(50) NOT NULL,
    position_id SMALLINT NOT NULL,

    CONSTRAINT fk_employee_position
        FOREIGN KEY (position_id)
        REFERENCES positions(position_id)
);

-- Usuarios (users)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_status BOOLEAN NOT NULL DEFAULT true,
    role_id SMALLINT NOT NULL,
    employee_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id),

    CONSTRAINT fk_user_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
);

-- Roles-permisos (role_permissions)
CREATE TABLE role_permissions (
    role_permission_id SERIAL PRIMARY KEY,
    role_id SMALLINT NOT NULL,
    permission_id INT NOT NULL,

    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(permission_id)
        ON DELETE CASCADE
);

-- Proyectos (projects)
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_status BOOLEAN NOT NULL,
    customer_id INT NOT NULL,
    project_name VARCHAR(50) NOT NULL,
    project_address VARCHAR(100),
    project_phone VARCHAR(20) NOT NULL,
    project_city VARCHAR(100) NOT NULL,

    CONSTRAINT fk_project_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);

-- Maquinaria (machinery)
CREATE TABLE machinery (
    machinery_id SERIAL PRIMARY KEY,
    status_id SMALLINT NOT NULL,
    category_id INT NOT NULL,
    next_revision_date DATE,
    machinery_name VARCHAR(100) NOT NULL,
    is_motorized BOOLEAN NOT NULL,
    sale_price DECIMAL(12,2) NOT NULL,
    daily_rental_price DECIMAL(9,2) NOT NULL,
    weight_kg DECIMAL(8,2),
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    is_owned BOOLEAN NOT NULL,
    machinery_description VARCHAR(1000) NOT NULL,

    CONSTRAINT fk_machinery_status
        FOREIGN KEY (status_id)
        REFERENCES machinery_status(status_id),

    CONSTRAINT fk_machinery_category
        FOREIGN KEY (category_id)
        REFERENCES machinery_categories(category_id)
);

-- Mantenimientos (maintenances)
CREATE TABLE maintenances (
    maintenance_id SERIAL PRIMARY KEY,
    machinery_id INT NOT NULL,
    maintenance_date DATE NOT NULL,
    revision_notes VARCHAR(500),

    CONSTRAINT fk_maintenance_machinery
        FOREIGN KEY (machinery_id)
        REFERENCES machinery(machinery_id)
);

-- Subalquileres (sub_rentals)
CREATE TABLE sub_rentals ( 
    sub_rental_id SERIAL PRIMARY KEY,
    machinery_id INT NOT NULL,
    supplier_id INT NOT NULL,
    supplier_cost DECIMAL(9,2) NOT NULL,
    sub_rental_status BOOLEAN NOT NULL,

    CONSTRAINT fk_sub_rental_machinery
        FOREIGN KEY (machinery_id)
        REFERENCES machinery(machinery_id),

    CONSTRAINT fk_sub_rental_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(supplier_id)
);

-- Facturas de compras (purchase_invoices)
CREATE TABLE purchase_invoices (
    invoice_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    invoice_photo BYTEA,

    CONSTRAINT fk_invoice_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(supplier_id)
);

-- Pedidos (orders)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_closing_date TIMESTAMP,
    project_id INT NOT NULL,
    order_status_id SMALLINT NOT NULL,
    user_id INT NOT NULL,
    discount_amount DECIMAL(9,2) DEFAULT 0.00,
    order_description VARCHAR(500),

    CONSTRAINT fk_order_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id),

    CONSTRAINT fk_order_status
        FOREIGN KEY (order_status_id)
        REFERENCES order_status(order_status_id),

    CONSTRAINT fk_order_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

-- Detalles de pedidos (order_details)
CREATE TABLE order_details (
    order_detail_id BIGSERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    machinery_id INT NOT NULL,
    machinery_name_snapshot VARCHAR(100),
    quantity_to_dispatch INT NOT NULL CHECK (quantity_to_dispatch > 0),
    rental_unit_price DECIMAL(9,2) NOT NULL,
    machinery_rental_status BOOLEAN DEFAULT TRUE,
    subtotal_weight_kg DECIMAL(8,2),

    CONSTRAINT fk_order_detail_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_detail_machinery
        FOREIGN KEY (machinery_id)
        REFERENCES machinery(machinery_id)
);

-- Devoluciones (returns)
CREATE TABLE returns (
    return_id BIGSERIAL PRIMARY KEY,
    return_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    returned_quantity INT NOT NULL CHECK (returned_quantity > 0),
    return_notes VARCHAR(500),
    order_detail_id BIGINT NOT NULL,

    CONSTRAINT fk_return_order_detail
        FOREIGN KEY (order_detail_id)
        REFERENCES order_details(order_detail_id)
);

-- Cobros adicionales (additional_charges)
CREATE TABLE additional_charges (
    additional_charge_id SERIAL PRIMARY KEY,
    charge_type_id INT NOT NULL,
    return_id BIGINT NOT NULL,
    charge_description VARCHAR(100),
    charge_amount DECIMAL(9,2) NOT NULL CHECK (charge_amount >= 0),

    CONSTRAINT fk_additional_charge_type
        FOREIGN KEY (charge_type_id)
        REFERENCES charge_types(charge_type_id),

    CONSTRAINT fk_additional_charge_return
        FOREIGN KEY (return_id)
        REFERENCES returns(return_id)
);

-- Abonos (payments)
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    payment_amount DECIMAL(9,2) NOT NULL CHECK (payment_amount > 0),
    payment_method VARCHAR(30) NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_payment_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
);

-- Vehiculos-cobros (vehicle_charges)
CREATE TABLE vehicle_charges (
    vehicle_charge_id SERIAL PRIMARY KEY,
    vehicle_id SMALLINT NOT NULL,
    additional_charge_id INT NOT NULL,

    CONSTRAINT fk_vehicle_charge_vehicle
        FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(vehicle_id),

    CONSTRAINT fk_vehicle_charge_additional_charge
        FOREIGN KEY (additional_charge_id)
        REFERENCES additional_charges(additional_charge_id)
);






-- 2. Inserts de Datos Maestros
INSERT INTO roles (role_id, role_name, role_status) VALUES (1, 'Administrador', true), (2, 'Asesor', true);
INSERT INTO order_status (order_status_name) VALUES ('Creado'), ('En proceso'), ('Cancelado'), ('Cerrado');
INSERT INTO positions (position_name) VALUES ('Desarrollador');

-- 3. Empleados
INSERT INTO employees (employee_document_type, employee_document_number, employee_status, employee_first_name, employee_last_name, employee_email, employee_phone, employee_eps, position_id)
VALUES 
('CC', '1025647253', TRUE, 'Juan Diego', 'Rios Restrepo', 'juanriosr7526@gmail.com', '3052264211', 'Sura', 1),
('CC', '1020114536', TRUE, 'Sara Camila', 'Ortiz Higuita', 'sara@gmail.com', '3054081703', 'Sura', 1),
('CC', '103213213', TRUE, 'Mariana', 'Figueroa Cardona', 'mariana@gmail.com', '3117384156', 'Sura', 1),
('CC', '999888777', TRUE, 'Usuario', 'Prueba', 'prueba@gmail.com', '3000000000', 'Sura', 1);

-- 4. Usuarios
INSERT INTO users (user_email, user_password, user_status, role_id, employee_id) 
VALUES 
('rios@gmail.com', '$2b$10$tvhRa6clQU/a93QkRtllYO8l7CJBpOj3g12AfPk0VVXyG34rJEcAu', true, 1, 1),
('sara@gmail.com', '$2b$10$ODpcGe.lD8NqIsVFIWL1OufTzmPuICg8HzMU9ax4ROPePZLU4cLim', true, 1, 2),
('mariana@gmail.com', '$2b$10$1Sct7Aomfd.CT053zqvEU.GQAB3LHvOmxAcnekXK1Jq5epws1YaYO', true, 1, 3),
('prueba@gmail.com', '$2b$10$wI5Y5q.Q5G3oW4qM5K.T.uey5.5v2oV5P3aKqYj2gXp9l4XQ4V.q.', true, 2, 4);

-- 5. Permisos (La lista completa)
INSERT INTO permissions (permission_name) VALUES 
('Listar Tipo de Cargo'), ('Crear Tipo de Cargo'), ('Ver Detalle de Tipo de Cargo'), ('Editar Tipo de Cargo'), ('Eliminar Tipo de Cargo'),
('Listar Cliente'), ('Crear Cliente'), ('Ver Detalle de Cliente'), ('Editar Cliente'), ('Eliminar Cliente'),
('Listar Empleado'), ('Crear Empleado'), ('Ver Detalle de Empleado'), ('Editar Empleado'), ('Eliminar Empleado'),
('Listar Categoría de Maquinaria'), ('Crear Categoría de Maquinaria'), ('Ver Detalle de Categoría de Maquinaria'), ('Editar Categoría de Maquinaria'), ('Eliminar Categoría de Maquinaria'),
('Listar Estado de Maquinaria'), ('Crear Estado de Maquinaria'), ('Ver Detalle de Estado de Maquinaria'), ('Editar Estado de Maquinaria'), ('Eliminar Estado de Maquinaria'),
('Listar Maquinaria'), ('Crear Maquinaria'), ('Ver Detalle de Maquinaria'), ('Editar Maquinaria'), ('Eliminar Maquinaria'),
('Listar Mantenimiento'), ('Crear Mantenimiento'), ('Ver Detalle de Mantenimiento'), ('Editar Mantenimiento'), ('Eliminar Mantenimiento'),
('Listar Detalle de Orden'), ('Crear Detalle de Orden'), ('Ver Detalle de Detalle de Orden'), ('Editar Detalle de Orden'), ('Eliminar Detalle de Orden'),
('Listar Orden'), ('Crear Orden'), ('Ver Detalle de Orden'), ('Editar Orden'), ('Eliminar Orden'), ('Crear Orden Completa'),
('Listar Estado de Orden'), ('Crear Estado de Orden'), ('Ver Detalle de Estado de Orden'), ('Editar Estado de Orden'), ('Eliminar Estado de Orden'),
('Listar Pago'), ('Crear Pago'), ('Ver Detalle de Pago'), ('Editar Pago'), ('Eliminar Pago'),
('Listar Cargo'), ('Crear Cargo'), ('Ver Detalle de Cargo'), ('Editar Cargo'), ('Eliminar Cargo'),
('Listar Proyecto'), ('Crear Proyecto'), ('Ver Detalle de Proyecto'), ('Editar Proyecto'), ('Eliminar Proyecto'),
('Listar Factura de Compra'), ('Crear Factura de Compra'), ('Ver Detalle de Factura de Compra'), ('Editar Factura de Compra'), ('Eliminar Factura de Compra'),
('Listar Devolución'), ('Crear Devolución'), ('Ver Detalle de Devolución'), ('Editar Devolución'), ('Eliminar Devolución'),
('Listar Rol'), ('Crear Rol'), ('Ver Detalle de Rol'), ('Editar Rol'), ('Eliminar Rol'),
('Listar Subalquiler'), ('Crear Subalquiler'), ('Ver Detalle de Subalquiler'), ('Editar Subalquiler'), ('Eliminar Subalquiler'),
('Listar Proveedor'), ('Crear Proveedor'), ('Ver Detalle de Proveedor'), ('Editar Proveedor'), ('Eliminar Proveedor'),
('Listar Usuario'), ('Crear Usuario'), ('Ver Detalle de Usuario'), ('Editar Usuario'), ('Eliminar Usuario'),
('Listar Vehículo'), ('Crear Vehículo'), ('Ver Detalle de Vehículo'), ('Editar Vehículo'), ('Eliminar Vehículo');

-- 6. Asignación final (Corregida con los nombres exactos en singular)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, permission_id FROM permissions;

INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, permission_id 
FROM permissions 
WHERE permission_name IN (
    'Crear Subalquiler', 'Listar Subalquiler', 'Ver Detalle de Subalquiler',
    'Crear Proyecto', 'Listar Proyecto', 'Ver Detalle de Proyecto',
    'Listar Maquinaria', 'Ver Detalle de Maquinaria',
    'Listar Categoría de Maquinaria', 'Listar Estado de Maquinaria',
    'Listar Vehículo', 'Ver Detalle de Vehículo',
    'Crear Cliente', 'Listar Cliente', 'Ver Detalle de Cliente',
    'Crear Orden', 'Listar Orden', 'Ver Detalle de Orden',
    'Crear Devolución', 'Listar Devolución', 'Ver Detalle de Devolución'
);