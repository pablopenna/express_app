# Esqueleto

Aplicación que consta de dos partes:

* Front-End: Se especifica una URL a la que hacer una petición POST. Se empleará el pathname de esa URL para hacer otra petición al propio servidor (*localhost:3000*) con el mismo pahtname.

Por ejemplo:

Si se envia una petición POST a `192.168.1.20:5000/op/media`, la aplicación también enviará otra petición POST a `localhost:3000/op/media`, es decir, al mismo servidor en el puerto 3000.

* Back-End: Implementa las diferentes operaciones cuyo resultado se comparará con el de la máquina a la que se ha preguntado.