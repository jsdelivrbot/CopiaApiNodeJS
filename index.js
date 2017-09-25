var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

var pg = require('pg');

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

/*
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});
*/


app.get('/db', function (request, response) {
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        client
            .query('SELECT * FROM test_table;', function(err, result) {

              if (err)
               { console.error(err); response.send("Error " + err); }
              else
               { response.render('pages/db', {results: result.rows} ); }
            });

    });
});

app.get('/test', function (request, response) {
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        client
            .query('SELECT * FROM test_table;', function(err, result) {

              if (err)
               {   console.error(err); response.send("Error " + err); client.release(); }
              else
                {
                  response.setHeader('Content-Type', 'application/json');
               response.send(JSON.stringify({ results: result.rows }));
               client.release();

                 }
            });

    });
});

app.get('/table', function (request, response) {
    pg.defaults.ssl = false;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        client
            .query('SELECT * FROM product_table JOIN type_table ON product_table.id_type_table = type_table.id_type_table JOIN maker ON product_table.id_maker = maker.id_maker;', function(err, result) {

              if (err)
               { console.error(err); response.send("Error " + err); client.release();
 }
              else
                {
                  response.setHeader('Content-Type', 'application/json');
               response.send(JSON.stringify({ results: result.rows }));
               client.release();

                 }
            });

    });
});

app.post('/insertTable', function(req, response) {

    var name = req.body.name;
    var characteristic = req.body.characteristic;
    var entry_date = req.body.entry_date;
    var maker = req.body.maker;
    var price = req.body.price;
    var type_table = req.body.type_table;

    pg.defaults.ssl = false;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');
        console.log(name)

        client
            .query("INSERT INTO product_table (  id_type_table, entry_date, firstname, characteristic, price, id_maker) VALUES (    1, '"+entry_date+"', '"+name+"', '"+characteristic+"', '"+price+"', 1);" , function(err, result) {

              if (err)
               { console.error(err); response.send("Error " + err); client.release();
}
              else
                {
                  response.setHeader('Content-Type', 'application/json');
                  response.send(JSON.stringify({ results: "true" }));
                  client.release();

                 }
            });

    });


});






// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/times', function(request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
