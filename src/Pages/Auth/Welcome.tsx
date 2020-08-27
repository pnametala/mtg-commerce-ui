import React, {useEffect, useState} from 'react';
import Login from "../../Components/Auth/Login/Login";
import Register from "../../Components/Auth/Register/Register";

import AuthService from "../../Services/AuthService";
import { useHistory } from 'react-router-dom';
import {Grid} from "@material-ui/core";

const Welcome = () => {

    const [firstRender, setFirstRender] = useState(true);
    const service = AuthService.getInstance()
    const history = useHistory();

    if(service.isLoggedIn())
        history.push('/app/home');


    useEffect(() => {
        setFirstRender(false);
    })

    if(firstRender) return null

    return (
        <Grid container spacing={2}>
            <Grid item md={6}>
                <Login></Login>
            </Grid>
            <Grid item md={6}>
                <Register></Register>
            </Grid>
        </Grid>
    );
};

export default Welcome;
