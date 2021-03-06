const express = require('express'); //
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bearerToken = require('express-bearer-token');
const events = require('./controller');


const connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : 'root',
  database : 'massage',

});



connection.connect();

const port = 8090;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});