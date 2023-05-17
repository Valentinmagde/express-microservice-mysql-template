import AuthenticationType from "../../app/modules/authentication/authentication.type"

export { }

declare global {
  declare namespace Express {
    interface Request {
      user? : AuthenticationType
      file? : File
    }
  }
}