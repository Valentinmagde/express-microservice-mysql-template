import dotEnv from 'dotenv';
import server from './server.js';

dotEnv.config();
server.startTheServer();
