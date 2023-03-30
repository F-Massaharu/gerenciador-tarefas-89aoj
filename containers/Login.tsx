/* eslint-disable @next/next/no-img-element */

export const Login = () => {
    return (
        <div className="container-login">
            <img src="logo.svg" alt="Logo Fiap" className='logo' />
            <div className="form">
                <div className="input">
                    <img src="mail.svg" alt="Login"/>
                    <input placeholder="Login"/>
                </div>

                <div className="input">
                    <img src="lock.svg" alt="Senha"/>
                    <input placeholder="Senha"/>
                </div>

                <button>Entrar</button>
            </div>
        </div>
    );
}