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
        <div>
            <h1>Registrar Usuario</h1>

            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Rol:</label>
                    <select value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>

                {err && <p style={{ color: 'red' }}>{err}</p>}
                {exito && <p style={{ color: 'green' }}>{exito}</p>}

                <button type="submit">Registrar</button>
            </form>

            <p>
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
}

export default Registrar;