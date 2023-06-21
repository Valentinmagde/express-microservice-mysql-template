import GenderType from "../gender/gender.type"
import RoleType from "../role/role.type"

export default interface UserType {
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    gender_id: GenderType | string,
    deleted_at: Date,
    online: boolean,
    created_at: Date,
    updated_at: Date
}