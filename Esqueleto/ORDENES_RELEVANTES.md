* Instalar node y npm.
    - En ubuntu: 
    ```shell
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
    - En windows: descargar instalador de la [web](https://nodejs.org/en/).
* Para instalar dependencias del proyecto:
```shell
npm install
```
Requiere estar en la carpeta del proyecto (carpeta en la que está este archivo).

* Para lanzar aplicación:
```shell
npm start
```
El script 'start' tiene que estar definido en package.json.
