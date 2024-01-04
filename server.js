var express = require('express');
var bodyParser = require('body-parser');
var { Client } = require('pg');

var app = express();

app.set('port', process.env.PORT || 5432);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    var connectionString = 'postgres://gqvavmcsseyfde:04d48bc94ff894c12df9862618459c62c50c8ab81aaabd56569f7bbbac1ccac2@ec2-3-217-146-37.compute-1.amazonaws.com:5432/dba9nkg793ccsq';

    var client = new Client({
        connectionString: connectionString
    });

    client.connect(function(err) {
        if (err) {
            console.error('Could not connect to PostgreSQL', err);
            return res.status(500).json({ error: 'Could not connect to the database' });
        }

        client.query(
            'UPDATE salesforce.Contact SET Active__c = $1',
            [true],
            function(err, result) {
                client.end(); // Close the connection

                if (err) {
                    console.error('Error executing query', err);
                    return res.status(400).json({ error: err.message });
                } else {
                    return res.json(result);
                }
            }
        );
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
