import React from 'react';

import { CopyOutlined } from '@ant-design/icons'

import '../App.css';
import { Popover, Button } from 'antd';

export default function GetReferralLink () {
    const queryParams = new URLSearchParams(window.location.search)
    const refId = queryParams.get('refId')    
    const textToCopy = `localhost:3000?refId=${refId}`

    const onClick = () => {
        navigator.clipboard.writeText(textToCopy)
    }

    return (
        <div className="App">
            <div className="referral-link">
                <h1>Share your link to get points!</h1>
                <span>Every time a participant signs up using this link you will get one point. Thanks for participating!</span>
                <Popover content={`localhost:3000?refId=${refId}`}>
                    <Button type='default' onClick={onClick}>Get Link!</Button>
                </Popover>
                
            </div>
        </div>
    )
}