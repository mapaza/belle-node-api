//Modulos
const express = require('express');
const mysql = require('mysql2');
//BodyParser
const bodyParser = require('body-parser');

var moment = require('moment');
var bcrypt = require('bcryptjs') 

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));