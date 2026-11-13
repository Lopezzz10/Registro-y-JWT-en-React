import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Perfil() {
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [error, setError] = useState('');

    const { token, logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const cargarPefil = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('No se pudo cargar Perfil, inicie sesion nuevamente');
                }

                const datos = await response.json();
                setDatosPerfil(datos);

            } catch (err) {
                setError(err.message);
            }
        };

        cargarPefil();
    }, [token]);

    const manejarLogOut = async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (err) {
            console.log('Error de red al intentar revocar el token: ' + err);
        }

        logout();
        navigate('/login');
    };

    return (
        <div className="auth-page">
            <div className="auth-card perfil-card">
                <div className="perfil-header">
                    <h2>Perfil de Usuario</h2>
                    <button className="btn btn-salir" onClick={manejarLogOut}>Cerrar Sesion</button>
                </div>

                {error && <p className="msg msg-error">{error}</p>}

                {datosPerfil && (
                    <div>
                        <p className="msg msg-exito">{datosPerfil.Mensaje}</p>

                        <div className="perfil-dato">
                            <span>Usuario</span>
                            <strong>{datosPerfil.Usuario}</strong>
                        </div>

                        <div className="perfil-dato">
                            <span>Rol</span>
                            <strong className="badge">{datosPerfil.rol_detectado}</strong>
                        </div>

                        <div className="perfil-dato">
                            <span>Estado</span>
                            <strong>{datosPerfil.status}</strong>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Perfil;