module.exports = {
    name: "Esquelo de Proyecto",
    version: "0.0.0",
    description: "Esqueleto para proyecto nodejs",
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
    },
    //bd produccion
    //database: {
    //    user: 'verderuserdb',
    //    password: 'maEATsK47E2B6eEusEqN2j4d2JK',
    //    domain: '127.0.0.1',
    //    port: 27017,
    //    name: 'verderdb'
    //},
}