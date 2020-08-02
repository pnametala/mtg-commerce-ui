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

export const UserContext = createContext({} as IUser);

// This context provider is passed to any component requiring the context
export class UserProvider extends Component  {
    private user = {} as IUser

    render (){
        return (<UserContext.Provider
            value={this.user}
        >
            {this.props.children}
        </UserContext.Provider>
        );
    }
};
