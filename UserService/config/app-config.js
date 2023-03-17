/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import bodyParser from 'body-parser';
import cors from 'cors';
import ExpressConfigModule from './express-config.js';
import JWT from './../utils/jwt.js';

class AppConfig {
  constructor(app) {
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
      // application specific logging, throwing an error, or other logic here
    });
    this.app = app;
  }

  includeConfig() {
    this.loadAppLevelConfig();
    this.loadExpressConfig();
  }

  loadAppLevelConfig() {
    this.app.use( bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  loadExpressConfig() {
    new ExpressConfigModule(this.app).setAppEngine();
    new JWT(this.app).setJWTConfig();
  }
}

export default AppConfig;
