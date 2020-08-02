import BaseService from "./BaseService";
import ILoginForm from "../Interfaces/Auth/ILoginForm";
import IUser from "../Components/UserProvider/UserProvider";

export default class AuthService extends BaseService {

    // private refreshTokenTimeout: NodeJS.Timeout;
    private static instance: AuthService;

    private constructor() {
        super();
    }

    static getInstance() {
        if(!AuthService.instance) AuthService.instance = new AuthService();

        return AuthService.instance;
    }

    login(credentials: ILoginForm) {
        return this.httpClient.post<IUser>('/users/auth', credentials)
            .then((res) => {
                this._bindUser(res.data);
            });
    }

    getUsers() {
       return this.httpClient.get<any[]>('/users')
           .then(data => console.log(data));
    }

    refreshToken() {
        console.log('refresh token')
        return this.httpClient.post<IUser>('/users/refresh-token')
            .then(res => {
                this._bindUser(res.data)
            })
    }

    isLoggedIn(): boolean {
        return Boolean(this.user && this.user.token);
    }

    getCurrentUser() {
        return this.user;
    }

    private _bindUser(user: IUser) {
        this.user = user;
        this._addAuthorizationHeader();
    }

    private _startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.user.token.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        //this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
    }
}
