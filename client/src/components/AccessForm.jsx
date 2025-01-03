import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SubmitButton from './SubmitButton'
import ConfirmationModal from './ConfirmationModal'
import MessageBanner from './MessageBanner'

const AccessForm = ({ onError, errorMessage, onClearError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    const validateForm = () => {
        const newErrors = {}

        if (!username || username.length < 4) {
            newErrors.username =
                'El nombre de usuario debe tener al menos 4 caracteres'
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida'
        } else if (
            password.length < 8 ||
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
        ) {
            newErrors.password =
                'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas y números'
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        onError('')
        setErrors({})

        const formErrors = validateForm()
        setErrors(formErrors)

        if (Object.keys(formErrors).length === 0) {
            try {
                const result = await login(username, password)

                if (result.success) {
                    navigate('/dashboard')
                } else {
                    onError(result.error || 'Error al iniciar sesión')
                }
            } catch (error) {
                onError('Error de conexión')
            }
        } else {
            onError(Object.values(formErrors)[0])
        }
    }

    const handleForgotPassword = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleModalConfirm = () => {
        handleModalClose()
    }

    return (
        <div className="relative flex flex-col items-center justify-center h-[98%] w-[98%] border-2 border-primary">
            {errorMessage && (
                <div className="absolute top-0 left-0 right-0 z-50">
                    <MessageBanner
                        message={errorMessage}
                        onClose={onClearError}
                    />
                </div>
            )}

            <div className="w-full max-w-md p-4 bg-white sm:p-8 md:p-12">
                <h2 className="mb-6 text-3xl font-bold text-center text-orange-500 font-helvetica-w20-bold">
                    Accede a tu cuenta
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold"
                        >
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={`w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0 ${
                                errors.username ? 'border-red-500' : ''
                            }`}
                            placeholder="Nombre de usuario"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={`w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0 ${
                                    errors.password ? 'border-red-500' : ''
                                }`}
                                placeholder="Contraseña"
                            />
                            <button
                                type="button"
                                className="absolute transform -translate-y-1/2 right-3 top-1/2 sm:right-4 sm:top-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    src={
                                        showPassword
                                            ? '/src/assets/password-open-eye.png'
                                            : '/src/assets/password-eye.png'
                                    }
                                    alt={showPassword ? 'Ocultar' : 'Mostrar'}
                                    className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="text-orange-500 form-checkbox"
                            />
                            <span className="ml-2 text-sm text-orange-500 font-helvetica-w20-bold">
                                Recordar contraseña
                            </span>
                        </div>
                        <Link
                            to="#"
                            className="text-sm text-orange-500 font-helvetica-w20-bold hover:underline"
                            onClick={handleForgotPassword}
                        >
                            Recuperar contraseña
                        </Link>
                    </div>

                    <SubmitButton text="Acceder" />
                </form>
            </div>

            <ConfirmationModal
                title="Recuperación de contraseña"
                isOpen={isModalOpen}
                onClose={handleModalClose}
                message="Contacta con un superadmin para recuperar tu contraseña"
                onConfirm={handleModalConfirm}
                showButtons={false}
            />
        </div>
    )
}

export default AccessForm
