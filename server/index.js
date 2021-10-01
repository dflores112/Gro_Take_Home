const express = require('express');

const app = express();
const port = 3000;

const path = require('path');
const controllers = require('./controllers');

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/orders/:id', controllers.calculateOrderTotal);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
