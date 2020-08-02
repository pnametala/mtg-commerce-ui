import React, {useContext, useEffect, useState} from 'react';
import {Row, Col, Divider} from 'antd';
import Login from "../../Components/Auth/Login/Login";
import Register from "../../Components/Auth/Register/Register";

import './Welcome.less';
import {EditFilled, ShopFilled} from "@ant-design/icons/lib";
import AuthService from "../../Services/AuthService";
import { useHistory } from 'react-router-dom';

const Welcome = () => {

    const [firstRender, setFirstRender] = useState(true);
    const service = AuthService.getInstance()
    const history = useHistory();

    if(service.isLoggedIn())
        history.push('/app');


    useEffect(() => {
        setFirstRender(false);
    })

    if(firstRender) return null

    return (
        <Row>
            <Col span={11}>
                <div className="welcome-form-wrapper">
                    <div className="welcome-form-header">
                        <div className="welcome-form-text">
                            <h3>Login to MTG Commerce</h3>
                            <p>Enter your email and password to log on:</p>
                        </div>
                        <div className="welcome-form-icon">
                            <ShopFilled/>
                        </div>
                    </div>
                    <div className="welcome-form-body">
                        <Login></Login>
                    </div>
                </div>
            </Col>
            <Col span={2} className="col-divider">
                <Divider type="vertical"></Divider>
            </Col>
            <Col span={11}>

                <div className="welcome-form-wrapper">
                    <div className="welcome-form-header">
                        <div className="welcome-form-text">
                            <h3>Sign up now</h3>
                            <p>Manage, buy and sell your cards!</p>
                        </div>
                        <div className="welcome-form-icon">
                            <EditFilled/>
                        </div>
                    </div>
                    <div className="welcome-form-body">
                        <Register></Register>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default Welcome;
