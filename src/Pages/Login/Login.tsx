import React from 'react'
import AuthCard from '../../Components/AuthCard/AuthCard'

type LoginProps = {
    onLoginSuccess?: () => void;
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const handleLogin = async ({ email, password }: { email: string; password: string }) => {
        console.log("🔑 Login:", { email, password });

        if (onLoginSuccess) onLoginSuccess();
    };

    const handleRequestReset = async ({ email }: { email: string }) => {
        console.log("Reset password request:", email);
    };

    const handleChangePassword = async ({ email, newPassword, code }: {
        email: string,
        newPassword: string,
        code?: string
    }) => {
        console.log("🔒 Cambiar contraseña:", { email, newPassword, code });
        // aquí llamas a tu backend/Firebase para actualizar contraseña
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "#f5f6fa",
            }}
        >
            <AuthCard
                defaultMode="login"
                onLogin={handleLogin}
                onRequestReset={handleRequestReset}
                onChangePassword={handleChangePassword}
                loading={false}
                texts={{
                    loginTitle: "Bienvenido de nuevo",
                    resetTitle: "Recuperar contraseña",
                    changeTitle: "Nueva contraseña",
                    emailPlaceholder: "Correo electrónico",
                    passwordPlaceholder: "Contraseña",
                    resetLink: "¿Olvidaste tu contraseña?",
                    backToLogin: "← Volver al login",
                    loginButton: "Ingresar",
                    requestResetButton: "Enviar enlace",
                    changePasswordButton: "Guardar nueva contraseña",
                }}
            />
        </div>
    )
}

export default Login