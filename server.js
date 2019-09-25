const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./userFiles/userRoutes');
const tabRoutes = require('./tabFiles/tabRoutes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/users', userRoutes);
server.use('/tabs', tabRoutes);

module.exports = server;
