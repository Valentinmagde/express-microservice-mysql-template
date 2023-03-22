import { Application } from "express";

class ExpressConfig {
  private app;
  
  constructor(app: Application) {
    this.app = app;
  }

  setAppEngine() {
    this.app.set('view engine', 'html');
  }
}

export default ExpressConfig;
