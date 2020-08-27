import React, {Component, createContext, useState} from "react";

export default interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    role: string;
    refreshToken: string;
}

interface IUserProviderProps {
    user: IUser;
}

export const UserContext = createContext({} as IUser);

// This context provider is passed to any component requiring the context
export class UserProvider extends Component  {
    private readonly user: IUser;
    constructor(props: IUserProviderProps) {
        super(props)
        this.user = props.user;
    }

    render (){
        return (<UserContext.Provider
            value={this.user}
        >
            {this.props.children}
        </UserContext.Provider>
        );
    }
};
