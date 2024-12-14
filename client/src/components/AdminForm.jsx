import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const AdminForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    title = 'Crear nuevo Administrador',
    isEditing = false,
}) => {
    const initialFormState = {
        username: '',
        password: '',
        confirmPassword: '',
        roleId: '',
    }

    const [formData, setFormData] = useState(initialFormState)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // Definición de opciones para el select
    const roleOptions = [
        { value: '1', label: 'Superadmin' },
        { value: '2', label: 'Admin' },
        { value: '3', label: 'Facilitator' },
    ]

    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                username: initialData.username || '',
                password: initialData.password || '',
                confirmPassword: initialData.password || '',
                roleId: initialData.role_id?.toString() || '',
            })
        } else {
            setFormData(initialFormState)
            setPasswordError('')
            setErrorMessage('')
        }
    }, [isEditing, initialData])

    const handleChange = (e) => {
        e.stopPropagation()
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Manejador para cambios en el select de roles
    const handleRoleChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            roleId: selectedOption ? selectedOption.value : '',
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Las contraseñas no coinciden')
            return
        }

        if (!formData.roleId) {
            setErrorMessage('Por favor, selecciona un rol')
            return
        }

        const submitData = {
            username: formData.username,
            password: formData.password,
            role_id: parseInt(formData.roleId),
        }

        const success = await onSubmit(submitData)
        if (success) {
            onCancel()
        }
    }

    // Personalizated styles for react-select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '2px solid black',
            borderColor: state.isFocused ? '#ff7b00' : 'black',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#ff7b00',
            },
            padding: '6px',
            borderRadius: '0',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#212529' : 'white',
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
                backgroundColor: state.isSelected ? '#212529' : '#f0f0f0',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className="relative w-full max-w-md p-4 bg-white sm:p-8 md:p-12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onCancel}
                    className="absolute p-2 text-gray-500 transition-colors duration-300 hover:text-orange-500 top-4 right-4"
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                <h2 className="mb-6 text-3xl font-bold text-orange-500 font-helvetica-w20-bold">
                    {title}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    autoComplete="off"
                >
                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                            placeholder="Nombre de usuario"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                                placeholder="Contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute transform -translate-y-1/2 right-3 top-1/2"
                            >
                                <img
                                    src="/src/assets/password-eye.png"
                                    alt={showPassword ? 'Ocultar' : 'Mostrar'}
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Confirmar contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                                placeholder="Confirmar contraseña"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute transform -translate-y-1/2 right-3 top-1/2"
                            >
                                <img
                                    src="/src/assets/password-eye.png"
                                    alt={
                                        showConfirmPassword
                                            ? 'Ocultar'
                                            : 'Mostrar'
                                    }
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">Rol</label>
                        <Select
                            value={roleOptions.find(
                                (option) => option.value === formData.roleId
                            )}
                            onChange={handleRoleChange}
                            options={roleOptions}
                            placeholder="Selecciona un rol"
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                            })}
                        />
                    </div>

                    {(passwordError || errorMessage) && (
                        <p className="text-sm text-red-500">
                            {passwordError || errorMessage}
                        </p>
                    )}

                    <div className="flex flex-col gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            {isEditing
                                ? 'Guardar Cambios'
                                : 'Crear Administrador'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminForm
