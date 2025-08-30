import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import "./AuthCard.sass";

// --- Types
export type AuthMode = "login" | "forgot" | "change";

type AuthCardTexts = {
    loginTitle?: string;
    resetTitle?: string;
    changeTitle?: string;
    emailPlaceholder?: string;
    passwordPlaceholder?: string;
    resetLink?: string;
    backToLogin?: string;
    loginButton?: string;
    requestResetButton?: string;
    changePasswordButton?: string;
};

type AuthCardProps = {
    defaultMode?: AuthMode;
    requireResetCode?: boolean;
    onLogin?: (data: { email: string; password: string }) => void | Promise<void>;
    onRequestReset?: (data: { email: string }) => void | Promise<void>;
    onChangePassword?: (data: { email: string; code?: string; newPassword: string }) => void | Promise<void>;
    loading?: boolean;
    title?: string;
    subtitle?: string;
    texts?: AuthCardTexts; // <-- aquí lo agregamos
};

const PasswordInput: React.FC<{
    registerProps: UseFormRegisterReturn;
    id: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
}> = ({ registerProps, id, placeholder, disabled, error }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="formGroup">
            <div className="passwordWrapper">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    className={`input ${error ? "error" : ""}`}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...registerProps}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="togglePassword"
                    aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                    disabled={disabled}
                >
                    {show ? "Ocultar" : "Mostrar"}
                </button>
            </div>
            {error && <p className="errorMsg">{error}</p>}
        </div>
    );
};

const AuthCard: React.FC<AuthCardProps> = ({
    defaultMode = "login",
    requireResetCode = true,
    onLogin,
    onRequestReset,
    onChangePassword,
    title,
    subtitle,
    loading = false,
}) => {
    const [mode, setMode] = useState<AuthMode>(defaultMode);

    const emailRules = {
        required: "El correo es obligatorio",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo no válido",
        },
    } as const;

    const loginForm = useForm<{ email: string; password: string }>({
        defaultValues: { email: "", password: "" },
        mode: "onTouched",
    });

    const forgotForm = useForm<{ email: string }>({
        defaultValues: { email: "" },
        mode: "onTouched",
    });

    const changeForm = useForm<{ email: string; code?: string; newPassword: string; confirm: string }>({
        defaultValues: { email: "", code: "", newPassword: "", confirm: "" },
        mode: "onTouched",
    });

    const onSubmitLogin = async (values: { email: string; password: string }) => {
        if (onLogin) await onLogin(values);
    };

    const onSubmitForgot = async (values: { email: string }) => {
        if (onRequestReset) await onRequestReset(values);
    };

    const onSubmitChange = async (values: { email: string; code?: string; newPassword: string; confirm: string }) => {
        if (values.newPassword !== values.confirm) {
            changeForm.setError("confirm", { type: "validate", message: "Las contraseñas no coinciden" });
            return;
        }
        if (onChangePassword)
            await onChangePassword({ email: values.email, code: values.code, newPassword: values.newPassword });
    };

    return (
        <div className="authCard">
            <div className="cardHeader">
                <h2>
                    {title ?? (mode === "login" ? "Iniciar sesión" : mode === "forgot" ? "Recuperar contraseña" : "Cambiar contraseña")}
                </h2>
                <p>
                    {subtitle ??
                        (mode === "login"
                            ? "Ingresa con tu correo y contraseña"
                            : mode === "forgot"
                                ? "Te enviaremos un enlace o código a tu correo"
                                : "Ingresa el código recibido y define una nueva contraseña")}
                </p>
            </div>

            <div className="cardTabs">
                <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} disabled={loading}>
                    Iniciar sesión
                </button>
                <button className={mode === "forgot" ? "active" : ""} onClick={() => setMode("forgot")} disabled={loading}>
                    Recuperar
                </button>
                <button className={mode === "change" ? "active" : ""} onClick={() => setMode("change")} disabled={loading}>
                    Cambiar
                </button>
            </div>

            {mode === "login" && (
                <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="form">
                    <div className="formGroup">
                        <label htmlFor="login_email">Correo electrónico</label>
                        <input
                            id="login_email"
                            type="email"
                            className={`input ${loginForm.formState.errors.email ? "error" : ""}`}
                            placeholder="tucorreo@ejemplo.com"
                            disabled={loading}
                            {...loginForm.register("email", emailRules)}
                        />
                        {loginForm.formState.errors.email && <p className="errorMsg">{loginForm.formState.errors.email.message}</p>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="login_password">Contraseña</label>
                        <PasswordInput
                            id="login_password"
                            placeholder="Tu contraseña"
                            disabled={loading}
                            registerProps={loginForm.register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            })}
                            error={loginForm.formState.errors.password?.message}
                        />
                    </div>

                    <button type="submit" className="btn primary" disabled={loading}>
                        {loading ? "Procesando…" : "Ingresar"}
                    </button>
                </form>
            )}

            {mode === "forgot" && (
                <form onSubmit={forgotForm.handleSubmit(onSubmitForgot)} className="form">
                    <div className="formGroup">
                        <label htmlFor="forgot_email">Correo electrónico</label>
                        <input
                            id="forgot_email"
                            type="email"
                            className={`input ${forgotForm.formState.errors.email ? "error" : ""}`}
                            placeholder="tucorreo@ejemplo.com"
                            disabled={loading}
                            {...forgotForm.register("email", emailRules)}
                        />
                        {forgotForm.formState.errors.email && <p className="errorMsg">{forgotForm.formState.errors.email.message}</p>}
                    </div>
                    <button type="submit" className="btn primary" disabled={loading}>
                        {loading ? "Enviando…" : "Enviar enlace / código"}
                    </button>
                </form>
            )}

            {mode === "change" && (
                <form onSubmit={changeForm.handleSubmit(onSubmitChange)} className="form">
                    <div className="formGroup">
                        <label htmlFor="change_email">Correo electrónico</label>
                        <input
                            id="change_email"
                            type="email"
                            className={`input ${changeForm.formState.errors.email ? "error" : ""}`}
                            placeholder="tucorreo@ejemplo.com"
                            disabled={loading}
                            {...changeForm.register("email", emailRules)}
                        />
                        {changeForm.formState.errors.email && <p className="errorMsg">{changeForm.formState.errors.email.message}</p>}
                    </div>

                    {requireResetCode && (
                        <div className="formGroup">
                            <label htmlFor="change_code">Código de verificación</label>
                            <input
                                id="change_code"
                                type="text"
                                className="input"
                                placeholder="Código recibido por correo"
                                disabled={loading}
                                {...changeForm.register("code", { required: "El código es obligatorio" })}
                            />
                            {changeForm.formState.errors.code && <p className="errorMsg">{changeForm.formState.errors.code.message as string}</p>}
                        </div>
                    )}

                    <div className="formGroup">
                        <label htmlFor="change_new">Nueva contraseña</label>
                        <PasswordInput
                            id="change_new"
                            placeholder="Nueva contraseña"
                            disabled={loading}
                            registerProps={changeForm.register("newPassword", {
                                required: "La nueva contraseña es obligatoria",
                                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            })}
                            error={changeForm.formState.errors.newPassword?.message}
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="change_confirm">Confirmar contraseña</label>
                        <PasswordInput
                            id="change_confirm"
                            placeholder="Repite la contraseña"
                            disabled={loading}
                            registerProps={changeForm.register("confirm", {
                                required: "Confirma tu contraseña",
                                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            })}
                            error={changeForm.formState.errors.confirm?.message}
                        />
                    </div>

                    <button type="submit" className="btn primary" disabled={loading}>
                        {loading ? "Actualizando…" : "Cambiar contraseña"}
                    </button>
                </form>
            )}

            <div className="cardFooter">
                {mode !== "login" ? (
                    <button type="button" onClick={() => setMode("login")} className="linkBtn" disabled={loading}>
                        ← Volver a iniciar sesión
                    </button>
                ) : (
                    <button type="button" onClick={() => setMode("forgot")} className="linkBtn" disabled={loading}>
                        ¿Olvidaste tu contraseña?
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthCard;
