import GenderType from "../gender/gender.type"
import RoleType from "../role/role.type"

export default interface UserType {
    _id: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    gender_id: GenderType | string,
    is_deleted: boolean,
    online: boolean,
    created_at: Date,
    updated_at: Date
}