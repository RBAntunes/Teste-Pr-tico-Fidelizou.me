import React, { useState } from 'react';

import ContestAPI from '../Models/ContestAPI';
import { Form, Input, Button } from 'antd';

import '../App.css';

export default function LinkRetrieval () {
  const [ errorMessage, setErrorMessage ] = useState(undefined)
  const contestAPI = new ContestAPI();

  const onFinish = ( values ) => {
    contestAPI.findParticipantByEmail( values.email )
    .then(
      response => (
        window.location.href = `/getLink?refId=${response.data}`
      )
    ).catch( e => (
      console.log(e),
      setErrorMessage('User e-mail does not exist!')
    ))
  }

  const onFinishFailed = ( errorInfo ) => {
    console.log('Failed:', errorInfo )
  }

  return (
    <div className='App'>
      <div className='error-message-wrapper'>
        {errorMessage && <span className='error-message'>{errorMessage}</span>}
      </div>
      <div className='form'>
        <div classname='form-wrapper'>
        <Form
          name='signup'
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Your e-mail'
            name='email'
            rules={[{required: true, message: 'E-mail required!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type='primary' htmlType='submit'>
              Get link
            </Button>
          </Form.Item>
        </Form>
        </div>
      </div>      
    </div>
  );
}
