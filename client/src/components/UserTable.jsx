import React from "react";

const UserTable = () => {
        //Datos simulados
        const users = [
            {id: 1, name: 'Alice', email: 'alice@example.com'},
            {id: 2, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 3, name: 'Alice', email: 'alice@example.com'},
            {id: 4, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 5, name: 'Alice', email: 'alice@example.com'},
            {id: 6, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 7, name: 'Alice', email: 'alice@example.com'},
            {id: 8, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 9, name: 'Alice', email: 'alice@example.com'},
            {id: 10, name: 'Alice', email: 'alice@example.com'},
        ];
   
    return (
        <div className="bg-white shadow-md p-4 sm:p-6 md:p-8">
            <button className="bg-orange text-black button-auto w-full px-4 py-2 rounded mb-4 sm:mb-6 md:mb-8">
                Crear nuevo usuario
            </button>
            <div className="overflow-x-auto">
            <table className="table-auto w-full border border-orange">
                <thead className="bg-orange text-white">
                    <tr>
                        <th className="text-black p-2 sm:p-3 md:p-4">Nombre</th>
                        <th className="text-black p-2 sm:p-3 md:p-4">Email</th>
                        <th className="text-black p-2 sm:p-3 md:p-4">Acciones</th>
                    </tr>                                           
                </thead>
                <tbody>
                {users.map((user, index) => (
            <tr key={index} className="text-center border-b border-orange">
              <td className="p-2 sm:p-3 md:p-4">{user.name}</td>
              <td className="p-2 sm:p-3 md:p-4">{user.email}</td>
              <td className="p-2 sm:p-3 md:p-4 flex justify-center">
                <button className="bg-orange text-black px-2 py-1 rounded mr-2 sm:mr-3 md:mr-4">
                  Editar
                </button>
                <button className="bg-white text-black px-2 py-1 rounded border border-black">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
            </table>
            </div>
        </div>
    )
}

export default UserTable;