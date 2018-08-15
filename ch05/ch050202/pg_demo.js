let pg = require('pg');
let conString = "tcp://postgres:123456@localhost:5432/postgres";
let client = new pg.Client(conString);
client.connect();

client.query(
    'INSERT INTO users ' +
    "(name) VALUES ('Mike')"
);

client.query(
    "INSERT INTO users " +
    "(name, age) VALUES ($1, $2)",
    ['Mike', 39]
);

client.query(
    "INSERT INTO users " +
    "(name, age) VALUES ($1, $2) " +
    "RETURNING id",
    ['Mike', 39],
    function(err, result) {
        if (err) throw err;
        console.log('Insert ID is ' + result.rows[0].id);
    }
);

// let query = client.query(
//     "SELECT * FROM users WHERE age > $1",
//     [40]
// );
// query.on('row', function(row) {
//     console.log(row.name)
// });
// query.on('end', function() {
//     client.end();
// });