export default interface AuthenticationType {
    _id: string,
    username: string,
    lastname: string,
    firstname: string,
    email: string,
    gender: string,
    roles: Array<Role>
}

interface Role {
    _id: string,
    name : string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}