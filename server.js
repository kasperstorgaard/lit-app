const express = require('express');

const app = express();

app.use(express.static('dist'));

app.listen(3000, () => console.log('server listening on :9000 :D'))


