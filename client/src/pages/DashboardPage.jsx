// src/pages/DashboardPage.jsx
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import AdministratorsTable from '../components/AdministratorsTable'
import CoursesTable from '../components/CoursesTable'
import MainPanel from '../components/MainPanel'
import EnrollmentsTable from '../components/EnrollmentsTable'
import EnrollmentsTableByCourse from '../components/EnrollmentsTableByCourse'
import AdminDashboard from '../components/AdminDashboard'
import { useDashboard } from '../context/DashboardContext'

const DashboardPage = () => {
    const { activeComponent, setActiveComponent } = useDashboard()
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <AdminDashboard />
            case 'administrators':
                return <AdministratorsTable />
            case 'enrollments':
                return <EnrollmentsTable />
            case 'courses':
                return (
                    <CoursesTable
                        onShowEnrollmentsByCourse={(courseId) => {
                            setSelectedCourseId(courseId)
                            setActiveComponent('enrollmentsByCourse')
                        }}
                    />
                )
            case 'enrollmentsByCourse':
                return <EnrollmentsTableByCourse courseId={selectedCourseId} />
            default:
                return <MainPanel title="Dashboard" />
        }
    }

    return (
        <div className="flex min-h-screen ">
            <Sidebar />
            <main className="flex flex-col flex-1 overflow-x-hidden">
                {renderComponent()}
            </main>
        </div>
    )
}

export default DashboardPage
