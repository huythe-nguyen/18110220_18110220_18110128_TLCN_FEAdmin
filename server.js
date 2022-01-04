//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/18110220_18110220_18110128_TLCN_FEAdmin'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/18110220_18110220_18110128_TLCN_FEAdmin/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
