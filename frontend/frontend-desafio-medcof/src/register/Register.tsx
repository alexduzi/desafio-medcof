import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { cleanAuthState, register } from '../slices/authSlice';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const authState = useAppSelector((state) => state.auth);

    const user = useAppSelector((state) => state.auth.user);

    function dismissError(event: React.MouseEvent<HTMLDivElement>) {
        dispatch(cleanAuthState());
        setError('');
    }

    const renderLoginError = () => {
        if (authState.error || error !== '') {
            return (<div className="mb-3 alert alert-danger" onClick={dismissError}>
                        {authState.error || error}
                    </div>);
        }
    }

    const renderSuccessMessage = () => { 
        if (user) {
            return (<div className="mb-3 alert alert-success">
                        <div>Usuário criado com sucesso!</div>
                        <Link to="/login">Logar!</Link>
                    </div>);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !email || !password) {
            setError('Preencha todos os campos para continuar!');
            return;
        }

        dispatch(register({ email, id: '', name, password })).catch(() => {
            console.log('Erro ao criar conta!');
        });
    }

    return (
        <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-grid gap-2">
                    <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                    <h3>Gerenciamento de tarefas</h3>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputNome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="exampleInputNome" onChange={(e) =>  setName(e.target.value)} />
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
                    <Link to="/login">Já tem conta? Logue aqui!</Link>
                </div>
                <div className="mb-3 d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Acessar</button>
                </div>
                {renderLoginError()}
                {renderSuccessMessage()}
            </form>
        </div>
    );
}

export default Register;