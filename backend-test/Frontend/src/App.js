import React, { useState } from 'react';

import ContestAPI from './Models/ContestAPI';
import { Form, Input, Button } from 'antd';

import './App.css';

export default function App () {
  const [ errorMessage, setErrorMessage ] = useState(undefined)
  const contestAPI = new ContestAPI();

  const queryParams = new URLSearchParams(window.location.search)
  const refId = queryParams.get('refId')

  const onFinish = ( values ) => {
    if ( !values.email.includes('@') ) {
      setErrorMessage('Invalid e-mail!')
    } else {
      if ( refId !== undefined ) {
        contestAPI.addNewParticipantWithReferralLink( values.name, values.email, values.phoneNumber, refId )
        .then(
          response => (
            window.location.href = `/getLink?refId=${response.data}`
          )
        ).catch( e => (
          console.log(e),
          setErrorMessage('User e-mail already exists!')
        ))
      } else {
        contestAPI.addNewParticipant( values.name, values.email, values.phoneNumber )
        .then(
          response => (
            window.location.href = `/getLink?refId=${response.data}`
          )
        ).catch( e => (
          console.log(e),
          setErrorMessage('User e-mail already exists!')
        ))
      }
    }
    
  }

  const onFinishFailed = ( errorInfo ) => {
    console.log('Failed:', errorInfo )
  }

  const redirectToLinkRetrievalPage = () => {
    window.location.href = '/forgotLink'
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
              label='Name'
              name='name'
              rules={[{required: true, message: 'Name required!'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label='E-mail'
              name='email'
              rules={[{required: true, message: 'E-mail required!'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label='Phone number'
              name='phoneNumber'
              rules={[{required: true, message: 'Phone number required!'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
              <Button type='primary' htmlType='submit'>
                Signup
              </Button>

              <Button type='primary' onClick={redirectToLinkRetrievalPage}>
                Forgot my link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>      
    </div>
  );
}
