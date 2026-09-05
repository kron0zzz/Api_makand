insert into machinery_categories (category_name) values ('Eléctrica');
insert into machinery_categories (category_name) values ('Soporte');

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Tacos 20mm', 'son una chimba pa sostener', false, 6000, 500, 3);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (1, 1, true, 500);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (1, 'Taladro deWalt 4000', 'ta ladrando', true, 3000000, 15000, 98);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-001', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-002', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-003', true, 1);

-- Maquinaria adicional de prueba
insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (1, 'Generador Honda 5000W', 'Generador portátil de gasolina', true, 8500000, 45000, 85);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (3, 1, 'GEN-001', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (3, 1, 'GEN-002', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (3, 1, 'GEN-003', true, 1);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (1, 'Compresor de Aire 150L', 'Compresor industrial 150 litros', true, 6200000, 38000, 120);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (4, 1, 'COM-001', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (4, 1, 'COM-002', true, 1);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (1, 'Sierra Circular Bosch', 'Sierra circular para madera y metal', true, 2100000, 18000, 12);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (5, 1, 'SIE-001', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (5, 1, 'SIE-002', true, 1);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (1, 'Retroexcavadora CAT', 'Retroexcavadora orugas', true, 45000000, 320000, 9500);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (6, 1, 'RET-001', true, 1);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (1, 'Montacargas Toyota', 'Montacargas eléctrico 2.5 ton', true, 28000000, 210000, 4200);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (7, 1, 'MON-001', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (7, 1, 'MON-002', true, 1);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Andamios Modulares', 'Juego de andamios modulares 6m', false, 1800000, 25000, 45);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (8, 1, true, 20);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Escalera de Aluminio', 'Escalera extensible 12 pasos', false, 450000, 8000, 18);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (9, 1, true, 35);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Casco de Seguridad', 'Casco industrial ajustable', false, 35000, 1500, 0.3);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (10, 1, true, 100);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Guantes de Cuero', 'Guantes de protección soldadura', false, 28000, 1200, 0.2);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (11, 1, true, 150);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Cinturón de Herramientas', 'Cinturón portaherramientas cuero', false, 65000, 3000, 1.2);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (12, 1, true, 60);

INSERT INTO suppliers (document_type, document_number, supplier_status, supplier_name, supplier_phone, supplier_state, supplier_city) VALUES ('CC', '10234454', true, 'Ferretería Vasquez', '3114553423', 'Antioquia', 'Caldas');

INSERT INTO purchase_invoices (supplier_id, purchase_date, total_amount) VALUES (1, '2026-08-07', 5000000);

INSERT INTO purchase_invoice_details (invoice_id, machinery_id, quantity, unit_cost, subtotal) VALUES (1, 2, 200, 4000, 6000);
INSERT INTO purchase_invoice_details (invoice_id, machinery_id, quantity, unit_cost, subtotal) VALUES (1, 1, 1, 4000000, 4000000);

INSERT INTO customers (organization_type, customer_document_type, customer_document_number, customer_status, customer_name, legal_representative, customer_phone) VALUES ('Jurídica', 'NIT', '4556654', true, 'Argos', 'Julian Mazo', '3024453232');
