import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const { login } = useAuth();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setErr('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const datos = await response.json();

            login(datos.token);
            navigate('/perfil');

        } catch (error) {
            setErr(error.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Iniciar Sesion</h1>
                <p className="auth-sub">Ingresa tus credenciales</p>

                <form onSubmit={manejarSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {err && <p className="msg msg-error">{err}</p>}

                    <button type="submit" className="btn">Ingresar</button>
                </form>

                <p className="auth-link">
                    ¿No tienes cuenta? <Link to="/registrar">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;