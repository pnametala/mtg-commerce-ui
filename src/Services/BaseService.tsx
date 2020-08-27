import axios, {AxiosInstance, AxiosResponse} from 'axios';
import IUser, {UserContext} from "../Components/UserProvider/UserProvider";
import {useContext} from "react";


export default abstract class BaseService {
    protected readonly httpClient: AxiosInstance;
    protected user: IUser;

    protected constructor(path?: string) {
        this.httpClient = axios.create( {
            baseURL: `https://localhost:5001/api${path}`,
            withCredentials: true
        })

        this.user = useContext(UserContext);
        this._initializeResponseInterceptor();

        if (this.user) this._addAuthorizationHeader()
    }

    private _initializeResponseInterceptor = () => {
        this.httpClient.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = (data : AxiosResponse) => data;

    protected _handleError = (error: any) => Promise.reject(error);

    protected _addAuthorizationHeader() {
        this.httpClient.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;
    }
}
