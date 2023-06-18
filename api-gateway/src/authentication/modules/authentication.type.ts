export default interface AuthenticationType {
    _id: string,
    username: string,
    lastname: string,
    firstname: string,
    email: string,
    gender: string,
    roles: Array<RoleType>
}

interface RoleType {
    _id: string,
    name : string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

export interface GenerateTokenType{
    accessToken: string,
    refreshToken: string
}