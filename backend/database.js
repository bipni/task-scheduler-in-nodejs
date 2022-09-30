const MongoClient = require('mongodb').MongoClient

var db;
var col;


/*
*   Database Connection Setup
*   @params     {None}
*   @return     {None}
*/

function connectDatabase() {
    const con = "mongodb://localhost:27017"

    MongoClient.connect(con, {
        useUnifiedTopology: true
    })
    .then(client => {
        // console.log('Database Connected!');
        db = client.db('assignment');
        col = db.collection('tasks');
    })
    .catch(error => console.log(error));
}

/*
*   For insert data into database
*   @params     {Object} data       -- Request send from user
*   @return     {Object} result     -- MongoDB Response after successful insertion
*/

function insert(data) {
    col.insertOne(data)
    .then(result => result)
    .catch(error => console.log(error));
}

module.exports = { connectDatabase, insert };