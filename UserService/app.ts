import dotEnv from 'dotenv';
import server from './src/server';

dotEnv.config();
server.startTheServer();
