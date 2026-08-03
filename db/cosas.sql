insert into machinery_categories (category_name) values ('Eléctrica');
insert into machinery_categories (category_name) values ('Soporte');

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Tacos 20mm', 'son una chimba pa sostener', false, 6000, 500, 3);
insert into machinery_stock (machinery_id, status_id, is_owned, stock_quantity) values (1, 1, true, 500);

insert into machinery (category_id, machinery_name, machinery_description, is_motorized, sale_price, daily_rental_price, weight_kg) values (2, 'Taladro deWalt 4000', 'ta ladrando', true, 3000000, 15000, 98);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-001', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-002', true, 1);
insert into machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity) values (2, 1, 'TAL-003', true, 1);

