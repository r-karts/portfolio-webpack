const path = require('path');
const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('Listening on port %s', port);
});
