import React, { useState, useEffect } from 'react'
import MainPanel from './MainPanel'
import Pagination from './Pagination'
import { getAllAdmins } from '../services/adminServices'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import excelIcon from '../assets/icons/file-excel.svg'
import pdfIcon from '../assets/icons/file-pdf.svg'
import { deleteAdminById } from '../services/adminServices'
import ConfirmationModal from './ConfirmationModal'
import AdminForm from './AdminForm'
import { useAuth } from '../context/AuthContext'

const AdministratorsTable = () => {
    const [admins, setAdmins] = useState([])
    const [filteredAdmins, setFilteredAdmins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const { authRequest } = useAuth()
    const itemsPerPage = 6

    // Calculate the index of the first and last item to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    // Obtain the current items to display on the current page
    const currentAdmins = filteredAdmins.slice(
        indexOfFirstItem,
        indexOfLastItem
    )

    const fetchAdmins = async () => {
        try {
            setLoading(true)
            const data = await getAllAdmins()
            setAdmins(data)
            setFilteredAdmins(data)
            setLoading(false)
        } catch (error) {
            console.error('Error al obtener los administradores:', error)
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAdmins()
    }, [])

    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase()
        const filtered = admins.filter((admin) =>
            admin.username.toLowerCase().includes(lowerCaseSearch)
        )
        setFilteredAdmins(filtered)
    }

    const handleExportPDF = async () => {
        try {
            const headers = ['Usuario', 'Rol']
            const data = filteredAdmins.map((admin) => [
                admin.username,
                admin.role_id === 1
                    ? 'Superadmin'
                    : admin.role_id === 2
                    ? 'Admin'
                    : 'Facilitator',
            ])
            await exportToPDF(
                'Listado de Administradores',
                headers,
                data,
                'administradores.pdf'
            )
        } catch (error) {
            console.error('Error al exportar a PDF:', error)
        }
    }

    const handleExportExcel = () => {
        try {
            const headers = ['Usuario', 'Rol']
            const data = filteredAdmins.map((admin) => [
                admin.username,
                admin.role_id === 1
                    ? 'Superadmin'
                    : admin.role_id === 2
                    ? 'Admin'
                    : 'Facilitator',
            ])
            exportToExcel(
                'Administradores',
                headers,
                data,
                'administradores.xlsx'
            )
        } catch (error) {
            console.error('Error al exportar a Excel:', error)
        }
    }

    const handleDeleteClick = async (admin) => {
        setSelectedAdmin(admin)
        setModalMessage(
            `¿Estás seguro de que deseas eliminar al administrador ${admin.username}?`
        )
        setIsModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        setIsModalOpen(false)
        try {
            await deleteAdminById(selectedAdmin.id)
            fetchAdmins()
        } catch (error) {
            console.error('Error al eliminar administrador:', error)
            alert('Error al eliminar el administrador')
        }
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los administradores</div>

    return (
        <MainPanel
            title="Gestión de Administradores"
            totalItems={filteredAdmins.length}
            onSearch={handleSearch}
        >
            <div className="flex flex-col h-[calc(100vh-240px)]">
                {/* Export buttons */}
                <div className="flex justify-between mb-3 space-x-4">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                    >
                        Crear Nuevo Administrador
                    </button>
                    <div className="flex gap-4">
                        <img
                            src={pdfIcon}
                            alt="Exportar a PDF"
                            className="w-10 h-10 cursor-pointer hover:opacity-80"
                            onClick={handleExportPDF}
                            title="Exportar a PDF"
                        />
                        <img
                            src={excelIcon}
                            alt="Exportar a Excel"
                            className="w-10 h-10 cursor-pointer hover:opacity-80"
                            onClick={handleExportExcel}
                            title="Exportar a Excel"
                        />
                    </div>
                </div>

                {/* Table container */}
                <div className="flex-1 min-h-0">
                    <table className="w-full border-collapse table-auto">
                        <thead className="bg-primary">
                            <tr>
                                <th className="w-2/5 p-4 text-left text-black border-b-2 font-helvetica-w20-bold border-primary">
                                    Usuario
                                </th>
                                <th className="w-1/5 p-4 text-left text-black border-b-2 font-helvetica-w20-bold border-primary">
                                    <div className="flex justify-start ml-10">
                                        Rol
                                    </div>
                                </th>
                                <th className="w-1/5 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">
                                    <div className="flex justify-start ml-4">
                                        Acciones
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAdmins.map((admin) => (
                                <tr
                                    key={admin.id}
                                    className="transition-colors border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="w-2/5 p-4 text-left font-helvetica-w20-bold">
                                        {admin.username}
                                    </td>
                                    <td className="w-2/5 p-4 text-left">
                                        <div className="ml-10">
                                            {admin.role_id === 1
                                                ? 'Superadmin'
                                                : admin.role_id === 2
                                                ? 'Admin'
                                                : 'Facilitator'}
                                        </div>
                                    </td>
                                    <td className="w-1/5 p-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    alert(
                                                        'Función de editar pendiente'
                                                    )
                                                }
                                                className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(admin)
                                                }
                                                className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="h-16">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(
                            filteredAdmins.length / itemsPerPage
                        )}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
                onConfirm={handleDeleteConfirm}
            />
            {showCreateModal && (
                <AdminForm
                    onSubmit={async (formData) => {
                        try {
                            const response = await authRequest(
                                'http://localhost:3000/api/auth/register',
                                {
                                    method: 'POST',
                                    body: JSON.stringify(formData),
                                }
                            )
                            if (response.ok) {
                                await fetchAdmins()
                                setShowCreateModal(false) // Cerrar modal después de crear exitosamente
                                return true
                            }
                            return false
                        } catch (error) {
                            console.error('Error:', error)
                            return false
                        }
                    }}
                    onCancel={() => setShowCreateModal(false)}
                    title="Crear nuevo Administrador"
                    submitText="Crear"
                />
            )}
        </MainPanel>
    )
}

export default AdministratorsTable
