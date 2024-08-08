import { User } from "./user"


export interface Attendance {
    id: number
    userId : number
    user: User
    logStatus : boolean
    date : Date
}
