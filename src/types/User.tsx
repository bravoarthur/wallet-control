

export type IUser = string 

export type UserListItem = {

    value: string,
    label: string
}


export interface IUserList extends Array<UserListItem> {

}