export default interface UserType {
    _id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    gender: string,
    isSeller: boolean,
    seller: Seller,
    roles: string,
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