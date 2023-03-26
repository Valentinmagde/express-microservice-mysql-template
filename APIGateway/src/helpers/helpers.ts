import express, { NextFunction, Request, Response, Router } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 * 
 * Class Helpers
 */
class Helpers {

  /**
   * Grouping routes
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   * 
   * @param Router user 
   * @returns void
   */
  public group = ((callback: (router: Router) => void) => {
    const router = express.Router();
    callback(router);
    return router;
  });
}

const helpers = new Helpers();
export default helpers;