import GenderType from "../gender/gender.type"
import RoleType from "../role/role.type"

export default interface UserType {
    _id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    gender: GenderType | string,
    isSeller: boolean,
    seller: Seller,
    roles: Array<string | RoleType>,
    isDeleted: boolean,
    online: boolean
}

interface Seller {
    name: string,
    logo: string,
    description: string,
    rating: number,
    numReviews: number
}