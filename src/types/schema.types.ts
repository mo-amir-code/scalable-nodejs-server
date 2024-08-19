
interface UserType extends Document {
    _id: string,
    username: string,
    password: string,
    refreshToken: string
}


export type {
    UserType
}