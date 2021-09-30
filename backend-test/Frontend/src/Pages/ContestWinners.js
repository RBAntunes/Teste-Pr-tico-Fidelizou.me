import React, { useState } from 'react';
import ContestAPI from '../Models/ContestAPI';

import { Table } from 'antd';

export default function ContestWinners () {
    const [ data, setData ] = useState(undefined)
    const contestAPI = new ContestAPI();

    contestAPI.getWinnersList().then( e => setData(e.data))

    const columns = [
        {
            title: 'Name',
            dataIndex: 'participants_name',
            key: 'participants_name'
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone number',
            dataIndex: 'phone_number',
            key: 'phone_number'
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points'
        }
    ]
    
    return (
        <div className='App'>
            <div className='table'>
                <h1>Contest Winners</h1>
                <div className='table-wrapper'>
                    <Table columns={columns} dataSource={data} />
                </div>
                
            </div>
        </div>
    )
}