# cositas


- debo verificar si cuando borro un order, también borra sus respectivos order-details (creo q si)




### returns

- luego también deberemos poner en el detalle de pedido lo de que se vea el estado del detalle pedido, si ya fue devuelto o q
- también después de q todo sea devuelto, el estado del pedido debe cambiar a un nuevo estado "devuelto"??? o mejor se cambia a cerrado una vez pagado?


### order status

- oe venga, definitivamente esto no debería tener endpoint, o se debe encontrar la manera de que no se pueda borrar ni modificar los 4 primeros estados


### rental cuts

- el problema actual es que por alguna razón las devoluciones se guardan con una hora, lo que genera que el algoritmo de crear cortes tome esas horas extra, convirtiendolas en un día extra, el cual se cobra. en este momento la tabla returns de la db tiene default, tal vez si lo quito se puede solucionar?, además chatgpt me sugirió cambiar ciertas cosas. 
NOTA: de resto, funciona bien los tramos, creo.