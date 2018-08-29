const {MongoClient} = require("mongodb");
// const {proxy, service, plugin} = require("./testdata");

async function create() {
    let database = await MongoClient.connect("mongodb://localhost:27017/");
    let db = database.db("mytest");
    //db.dropDatabase();
    await db.createCollection('proxies');
    await db.createCollection('services');
    await db.createCollection('plugins');
    database.close();
}

create();
async function insert() {
    let database = await MongoClient.connect("mongodb://localhost:27022/");
    let db = database.db("mytest");
    let res;
    res = await db.collection("proxies").insertOne(proxy);
    res = await db.collection("services").insertOne(service);
    res = await db.collection("plugins").insertOne(plugin);
    database.close();
}

