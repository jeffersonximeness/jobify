import React, { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);
    const { user, isLoading, showAlert, displayAlert, registerUser } = useAppContext()

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values
        
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }

        if (isMember) {
            console.log('already a member')
        } else {
            registerUser({ name, email, password })
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                {!values.isMember && (
                    <FormRow 
                        name='name'
                        type='text'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                <FormRow 
                    name='email'
                    type='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                <FormRow 
                    name='password'
                    type='password'
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    Submit
                </button>

                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register