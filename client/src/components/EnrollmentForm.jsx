import React, { useState, useEffect } from 'react'

const EnrollmentForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    submitText = 'Crear Inscripción',
    title = 'Crear nueva Inscripción',
    isEditing = false,
}) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        gender: 'NS/NC',
        age: '',
        is_first_activity: false,
        minors: [],
    })

    const [newMinor, setNewMinor] = useState({ name: '', age: '' })
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                fullname: initialData.fullname || '',
                email: initialData.email || '',
                gender: initialData.gender || 'NS/NC',
                age: initialData.age || '',
                is_first_activity: initialData.is_first_activity || false,
                minors: initialData.minors || [],
            })
        }
    }, [isEditing, initialData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleMinorChange = (e) => {
        const { name, value } = e.target
        setNewMinor((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleMinorEdit = (index, field, value) => {
        setFormData((prev) => {
            const updatedMinors = [...prev.minors]
            updatedMinors[index][field] = value
            return { ...prev, minors: updatedMinors }
        })
    }

    const addMinor = () => {
        if (formData.minors.length >= 3) {
            setErrorMessage('Solo puedes añadir un máximo de 3 menores')
            return
        }

        if (!newMinor.name || !newMinor.age) {
            setErrorMessage('El nombre y la edad del menor son obligatorios')
            return
        }

        setFormData((prev) => ({
            ...prev,
            minors: [...prev.minors, { ...newMinor }],
        }))

        setNewMinor({ name: '', age: '' })
        setErrorMessage('')
    }

    const removeMinor = (index) => {
        setFormData((prev) => ({
            ...prev,
            minors: prev.minors.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.fullname || !formData.email || !formData.age) {
            setErrorMessage('Por favor, completa los campos obligatorios')
            return
        }

        const success = await onSubmit(formData)
        if (success) {
            onCancel()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className="relative w-[600px] bg-white p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onCancel}
                    className="absolute p-2 text-gray-500 hover:text-dark top-4 right-4"
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

                <h2 className="mb-8 text-2xl font-bold text-dark">{title}</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col">
                        <label className="mb-1 font-bold text-dark">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 focus:border-dark focus:outline-none"
                            placeholder="Nombre Completo"
                        />
                    </div>

                    <div className="grid items-center grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-bold text-dark">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 focus:border-dark focus:outline-none"
                                placeholder="Correo Electrónico"
                            />
                        </div>

                        <div className="flex items-center gap-2 -mb-6">
                            <input
                                type="checkbox"
                                name="is_first_activity"
                                checked={formData.is_first_activity}
                                onChange={handleChange}
                            />
                            <label className="font-bold text-dark">
                                Primera Actividad en Orange
                            </label>
                        </div>
                    </div>

                    <div className="grid items-center grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-bold text-dark">
                                Género
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 focus:border-dark focus:outline-none"
                            >
                                <option value="NS/NC">NS/NC</option>
                                <option value="mujer">Mujer</option>
                                <option value="hombre">Hombre</option>
                                <option value="otros generos">
                                    Otros Géneros
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-bold text-dark">
                                Edad
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 focus:border-dark focus:outline-none"
                                placeholder="Edad"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-bold text-dark">
                            Menores Inscritos
                        </h3>
                        {formData.minors.map((minor, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-2"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    value={minor.name}
                                    onChange={(e) =>
                                        handleMinorEdit(
                                            index,
                                            'name',
                                            e.target.value
                                        )
                                    }
                                    className="w-1/2 p-1 border border-gray-300"
                                />

                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="age"
                                        value={minor.age}
                                        onChange={(e) =>
                                            handleMinorEdit(
                                                index,
                                                'age',
                                                e.target.value
                                            )
                                        }
                                        className="w-16 p-1 border border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-500">
                                        años
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeMinor(index)}
                                    className="px-4 py-1 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}

                        {formData.minors.length < 3 && (
                            <div className="mb-2 text-dark">
                                <div className="flex items-center justify-between p-2 ">
                                    <input
                                        type="text"
                                        name="name"
                                        value={newMinor.name}
                                        onChange={handleMinorChange}
                                        placeholder="Nombre del Menor"
                                        className="w-1/2 p-1 border border-gray-300"
                                    />

                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            name="age"
                                            value={newMinor.age}
                                            onChange={(e) => {
                                                const value = Math.max(
                                                    0,
                                                    Number(e.target.value)
                                                ) // Asegura que no sea menor a 0
                                                setNewMinor((prev) => ({
                                                    ...prev,
                                                    age: value,
                                                }))
                                            }}
                                            placeholder="Edad"
                                            className="w-16 p-1 border border-gray-300"
                                        />
                                        <span className="ml-2 text-gray-500">
                                            años
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addMinor}
                                        disabled={formData.minors.length >= 3}
                                        className={`px-5 py-1 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold ${
                                            formData.minors.length >= 3
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-dark hover:text-white'
                                        }`}
                                    >
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-1 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-1 text-white bg-dark hover:bg-gray-700"
                        >
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EnrollmentForm
