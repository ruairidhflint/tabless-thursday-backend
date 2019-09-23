const express = require('express');
const cors = require('cors');
const userRoutes = require('./userFiles/userRoutes');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/users', userRoutes);

module.exports = server;
