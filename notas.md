# cositas


- debo verificar si cuando borro un order, también borra sus respectivos order-details (creo q si)




### returns
- ???


### order status

- oe venga, definitivamente esto no debería tener endpoint, o se debe encontrar la manera de que no se pueda borrar ni modificar los 4 primeros estados


### rental cuts

- nada por decir mi seño, todo melo (al menos con el create)
- hice un pedido el 1 de mayo e hice el corte un 15, se deberían cobrar 15 o 14 días? porque en este momento se cobran x 14

### orders

- (no va a haber borrar sino anular) cuando se intente borrar y haya un pago o un corte, no solo debería aparecer un mensaje de que no se puede, sino que debería decir también el por qué
- para el front, ese descuento está muy raro
- en los detalles debe aparecer el peso total

### payments

- cuando se cree el último pago y el saldo pendiente sea 0 va a cambiar el estado de pedido a "pagado"? ahora que lo pienso, creo que no es buena idea, porque si el cliente es cumplido con los cortes y los paga de una, constantemente ese saldo pendinte va a ser 0.

### customers
- en este momento el campo de tipo de organizacion es varchar, considerando que por ahora solo estamos seleccionando entre natural y jurídica, no es mejor que sea un boolean? así nos ahorramos problemas de vulnerabilidades en el front.

## toda la mierda de maquinaria

### maquinaria
- como se cambiaron los campos, debo revisar si en el repository todo tiene los campos adecuados y que funcionen los endpoints


#### notas pal front
- se cambia el form de maquinaria
