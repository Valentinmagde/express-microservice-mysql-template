import { Request } from "express"

export { }

declare global {
  declare namespace Express {
    interface Request {
      user? : any
      file? : any
    }
  }
}