# cositas


- debo verificar si cuando borro un order, también borra sus respectivos order-details (creo q si)




### returns

- luego también deberemos poner en el detalle de pedido lo de que se vea el estado del detalle pedido, si ya fue devuelto o q


### order status

- oe venga, definitivamente esto no debería tener endpoint, o se debe encontrar la manera de que no se pueda borrar ni modificar los 4 primeros estados


### rental cuts

- estoy en la versión 1, el payload es simplemente el order_id y las notas, pero la fecha de inicio del corte está bien, lo que hay que corregir es la fecha de fin, la cual debe poderse asignar manualmente, solo he hecho dos pruebas, la primera estuvo bien (aunque se puso automaticamente la fecha de cierre), aún no he probado nada con las devoluciones, así que ese es el primer paso