import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { cleanAuthState, login } from '../slices/authSlice';

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authState = useAppSelector((state) => state.auth);

    const handleLogin = async () => {
        try {
          await dispatch(login({ email, password })).unwrap();
          navigate("/tasks");
        } catch (e) {
          console.error(e);
        }
    };

    function dismissError(event: React.MouseEvent<HTMLDivElement>) {
        dispatch(cleanAuthState());
    }

    const renderLoginError = () => {
        if (authState.error) {
            return (<div className="mb-3 alert alert-danger" onClick={dismissError}>
                        {authState.error}
                    </div>);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        handleLogin();
    }

    return (
        <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-grid gap-2">
                    <h1 style={{ textAlign: 'center' }}>Login</h1>
                    <h3>Gerenciamento de tarefas</h3>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) =>  setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) =>  setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <Link to="/register">Não tem conta? Cadastre-se aqui!</Link>
                </div>
                <div className="mb-3 d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Acessar</button>
                </div>
                {renderLoginError()}
            </form>
        </div>
    );

}

export default Login;