insert into machinery_categories (category_name) values ('Eléctrica');
insert into machinery_categories (category_name) values ('Soporte');

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Tacos 20mm', 'son una chimba pa sostener', false, 6000, 500, 3);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (1, 1, true, 500);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (1, 'Taladro deWalt 4000', 'ta ladrando', true, 3000000, 15000, 98);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-001', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-002', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-003', true, 1);


INSERT INTO suppliers (document_type, document_number, supplier_status, supplier_name, supplier_phone, supplier_state, supplier_city) VALUES ('CC', '10234454', true, 'Ferretería Vasquez', '3114553423', 'Antioquia', 'Caldas');

INSERT INTO purchase_invoices (supplier_id, purchase_date, total_amount) VALUES (1, '2026-08-07', 5000000);

INSERT INTO purchase_invoice_details (invoice_id, machinery_id, quantity, unit_cost, subtotal) VALUES (1, 2, 200, 4000, 6000);
INSERT INTO purchase_invoice_details (invoice_id, machinery_id, quantity, unit_cost, subtotal) VALUES (1, 1, 1, 4000000, 4000000);

INSERT INTO customers (organization_type, customer_document_type, customer_document_number, customer_status, customer_name, legal_representative, customer_phone) VALUES ('Jurídica', 'NIT', '4556654', true, 'Argos', 'Julian Mazo', '3024453232');
