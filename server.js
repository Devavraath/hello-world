var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, conn, done) {
        if (err) console.log(err);

        conn.query(
            'UPDATE Salesforce.Contact SET Active__c = True',
            function(err, result) {
                done();
                res.json(result);
            }
        )
    })
});

app.listen(app.get('port'),function() {
    console.log('Express server listening on port ' + app.get('port'));
});
