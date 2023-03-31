/* eslint-disable @next/next/no-img-element */

import { executeRequest } from "@/services/api";
import { NextPage } from "next";
import { useState } from "react";

type LoginProps = {
    setAccessToken( s:string) : void
}

export const Login : NextPage<LoginProps> = ({setAccessToken}) => {
    
    const [loading,setLoading] = useState(false);
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const doLogin = async() => {
        try {
            setError('');
            if(!login || login.trim().length <1
            || !password || password.trim().length<1){
                return setError("Favor preencher o formulário!");
            }
            setLoading(true);

            const body ={login,password};
            const response = await executeRequest('login','POST', body);
            if(response &&response.data){
                const {token,name,email}= response.data;
                localStorage.setItem('accessToken',token);
                localStorage.setItem('name',name);
                localStorage.setItem('email',email);
                setAccessToken(token);
            }else{
               setLoading(false);
            }
            
        } catch (e: any) {
            console.log("erro");
            if(e?.response?.data?.error){
                setError(e?.response?.data?.error);
            }else{
                setError("Ocorreu um erro, tente novamente.");
            }
            
        }
        setLoading(false);
        
    }

    return (
        <div className="container-login">
            <img src="logo.svg" alt="Logo Fiap" className='logo' />
            <div className="form">
                {error && <p className="error"> {error}</p>}

                <div className="input">
                    <img src="mail.svg" alt="Login"/>
                    <input placeholder="Login" value={login} onChange = { e => setLogin(e.target.value)}/>
                </div>

                <div className="input">
                    <img src="lock.svg" alt="Senha"/>
                    <input placeholder="Senha" type="password" value={password} onChange = { e => setPassword(e.target.value)}/>
                </div>

                <button onClick={doLogin} disabled={loading} >{loading? '...Carregando' : 'Login'}</button>
            </div>
        </div>
    );
}