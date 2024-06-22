import { Outlet } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout';

function Admin() {
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    )
}

export default Admin;