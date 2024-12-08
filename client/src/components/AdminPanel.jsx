import React, { useState, useEffect } from 'react';
import {
  getAllEnrollments,
  deleteEnrollmentById,
} from '../services/enrollmentServices.js';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import EmailEditorComponent from './EmailEditor.jsx';

const AdminPanel = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await getAllEnrollments();
      setEnrollments(data);
      setFilteredEnrollments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = enrollments.filter(
      (enrollment) =>
        enrollment.fullname.toLowerCase().includes(lowerCaseSearch) ||
        enrollment.email.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredEnrollments(filtered);
  };

  // Abrir el editor con los destinatarios seleccionados
  const handleOpenEditor = (recipients) => {
    setSelectedRecipients(recipients); // Establecer destinatarios
    setShowEmailEditor(true); // Mostrar el editor
  };

  // Manejar el envío del correo
  const handleSendEmail = async (emailData) => {
    console.log('Enviar correo con los siguientes datos:', emailData);

    try {
      // Aquí puedes integrar la lógica para enviar el correo al backend
      // Ejemplo:
      // await axios.post('/api/send-email', { emailData, recipients: selectedRecipients });

      alert('Correo enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo');
    }

    setShowEmailEditor(false); // Cerrar el editor después del envío
  };

  // Cerrar el editor sin enviar
  const handleCloseEditor = () => {
    setShowEmailEditor(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error al cargar los usuarios</div>;
  }

  return (
    <div className='flex flex-col min-h-screen bg-white p-4'>
      {/* Encabezado */}
      <div className='mb-2 flex flex-col md:flex-row md:justify-between md:items-center'>
        <h1 className='text-orange text-2xl font-bold p-1'>
          Gestión de Inscripciones
        </h1>
      </div>
      {/* Línea naranja */}
      <div className='border-t-2 border-orange mb-4'></div>
      {/* Total Inscripciones y barra de búsqueda */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
        <p className='text-black text-center mb-0 md:mb-0 p-8'>
          Total de inscripciones: {filteredEnrollments.length}
        </p>
        <div className='flex items-right md:1/3'>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      {/* Tabla */}
      <div className='max-h-1/2 mt-2 overflow-y-auto max-w-full'>
        <UserTable
          users={filteredEnrollments}
          onSendEmail={(recipients) => handleOpenEditor(recipients)}
        />
      </div>

      {/* Editor de correos */}
      {showEmailEditor && (
        <EmailEditorComponent
          onSendEmail={handleSendEmail}
          onClose={handleCloseEditor}
          recipients={selectedRecipients}
        />
      )}
    </div>
  );
};

export default AdminPanel;
