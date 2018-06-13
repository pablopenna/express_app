module.exports = {
    name: "Comparador",
    version: "0.0.0",
    description: "Aplicación en Express que hace y comprueba peticiones",
    domain: "",
    url: "",
    env: "development",
    port: 3000,
    encriptacion: 12,
    //bd maqueta
    database: {
        //mongodb://<dbuser>:<dbpassword>@ds016128.mlab.com:16128/express_mongo
        user: 'user',
        password: '123qwe',
        domain: 'ds016128.mlab.com',
        port: 16128,
        name: 'express_mongo'
    }
}