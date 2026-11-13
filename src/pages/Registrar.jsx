import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Registrar() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('USER');
    const [err, setErr] = useState('');
    const [exito, setExito] = useState('');

    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        setExito('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, rol }),
            });

            if (response.status === 201) {
                setExito('Usuario registrado correctamente. Redirigiendo al login...');
                timeoutRef.current = setTimeout(() => navigate('/login'), 2000);
            } else {
                const texto = await response.text();
                throw new Error(texto || 'No se pudo registrar el usuario');
            }

        } catch (error) {
            if (error instanceof TypeError) {
                setErr('Error de red: no se pudo conectar con el servidor');
            } else {
                setErr(error.message);
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Crear Cuenta</h1>
                <p className="auth-sub">Regístrate para acceder al sistema</p>

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

                    <div className="form-group">
                        <label htmlFor="rol">Rol</label>
                        <select
                            id="rol"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    {err && <p className="msg msg-error">{err}</p>}
                    {exito && <p className="msg msg-exito">{exito}</p>}

                    <button type="submit" className="btn">Registrar</button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Registrar;