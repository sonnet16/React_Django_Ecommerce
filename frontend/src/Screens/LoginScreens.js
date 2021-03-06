import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { login } from '../Actions/userActions'

function LoginScreens({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)

    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
           history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const  submitHandaler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'> { error } </Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandaler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='outline-dark' className='btn-block mt-2'>
                    Sign In
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                New Customer? <Link to={ redirect? `/user/register?redirect=${redirect}` : '/user/register'} >
                    Register
                </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreens
