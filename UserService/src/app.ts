import dotEnv from 'dotenv';
import server from './server';

dotEnv.config();
server.startTheServer();