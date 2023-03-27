import React, { useState, ReactNode, createContext } from "react";
import { IUser, IUserList, UserListItem } from "types/User";

interface UserProps {
    user: IUser;
    userList: IUserList;
    defineUserList: (newItem: UserListItem) => void;
    newLogin: boolean;
}

type UserContextProps = {
    children: ReactNode;
    //children: JSX.Element
};

export const UserContext = createContext<UserProps>({} as UserProps);

export const UserProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<IUser>(
        JSON.parse(`${localStorage.getItem(`currentUser`)}`)
    );
    const [userList, setUserList] = useState<IUserList>(
        JSON.parse(`${localStorage.getItem(`userList`)}`) || []
    );
    const [newLogin, setNewLogin] = useState(true);

    function defineUserList(newItem: UserListItem) {
        const index = userList.findIndex(
            (item) => item.value === newItem.label
        );
        if (index === -1) {
            setUserList([...userList, newItem]);
            setUser(newItem.label);
            setNewLogin(false);
            localStorage.setItem(
                `userList`,
                JSON.stringify([...userList, newItem])
            );
            localStorage.setItem(`currentUser`, JSON.stringify(newItem.label));
        } else {
            setUser(newItem.label);
            localStorage.setItem(`currentUser`, JSON.stringify(newItem.label));
            setNewLogin(false);
        }
    }

    return (
        <UserContext.Provider
            value={{ user, userList, defineUserList, newLogin }}
        >
            {children}
        </UserContext.Provider>
    );
};

