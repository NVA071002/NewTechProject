import React, { useState } from 'react';
import InputControl from '../../component/InputControl';
import './Auth.css';
import axios from 'axios';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000', // Thay đổi địa chỉ và cổng theo địa chỉ của server của bạn
      });
   

    return (
        <div className={'container'}>
            <section className={'wrapper'}>
                <h1 className='text text-large'>Sign In</h1>
                <p className='text text-normal'>New User? <span ><a href="/auth/register" className='text text-links'>Create an account</a></span></p>
                <form className={'form'}>
                    <div className={'input-control'}>
                        <label for="email" hidden>Email Address</label>
                        <InputControl type={email} value={email} className='input-field' placeHolder='Email Address' onChange={(ev) => setEmail(ev)}></InputControl>
                    </div>
                    <div className={'input-control'}>
                        <label for="email" hidden>Password</label>
                        <InputControl type='password' value={password} className='input-field' placeHolder='Password' onChange={(ev) => setPassword(ev)}></InputControl>

                    </div>
                    <div className='input-control'>
                        <a  href="#" className='text text-links'>Forgot Password</a>
                        <button type='submit' className='input-submit' value='Sign In' onClick={(e)=>{
                            e.preventDefault();
                            console.log('click send');
                            axiosInstance.post('/auth/login',{
                                username:email,
                                password:password
                        
                            }).then(response=>{
                                console.log(response.data);
                                if (response.data.message === 'Login successful') {
                                    window.location.href = '/';
                                } else {
                                    alert('Login failed ' + response.data);
                                }
                                return;
                            })
                            .catch(err=>{console.log(err)})
                        }}>Login</button>
                    </div>
                </form>
                <div className='striped'>
                    <span className='striped-line'></span>
                    <span className="striped-text">Or</span>
                    <span className="striped-line"></span>
                </div>
                <div className='method'>
                    <div className="method-control">
                        <a href="#" className="method-action">
                            <i className="ion ion-logo-google"></i>
                            <span>Sign in with Google</span>
                        </a>
                    </div>
                </div>

            </section>
        </div>
    )
}
