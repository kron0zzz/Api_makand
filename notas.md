# cositas


- debo verificar si cuando borro un order, también borra sus respectivos order-details (creo q si)




### returns

- luego también deberemos poner en el detalle de pedido lo de que se vea el estado del detalle pedido, si ya fue devuelto o q
- también después de q todo sea devuelto, el estado del pedido debe cambiar a un nuevo estado "devuelto"??? o mejor se cambia a cerrado una vez pagado?
- realmente es necesario las notas de devolución?


### order status

- oe venga, definitivamente esto no debería tener endpoint, o se debe encontrar la manera de que no se pueda borrar ni modificar los 4 primeros estados


### rental cuts

- nada por decir mi seño, todo melo (al menos con el create)
- es muy necesario las notas de cortes?
- hice un pedido el 1 de mayo e hice el corte un 15, se deberían cobrar 15 o 14 días? porque en este momento se cobran x 14

### orders

- cuando se intente borrar y haya un pago o un corte, no solo debería aparecer un mensaje de que no se puede, sino que debería decir también el por qué
- para el front, ese descuento está muy raro
- en los detalles debe aparecer el peso total