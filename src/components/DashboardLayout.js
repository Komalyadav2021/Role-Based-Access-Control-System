import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/DashboardLayout.css';

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <div className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li><Link to="/users">User Management</Link></li>
                    <li><Link to="/roles">Role Management</Link></li>
                    <li><Link to="/permissions">Permission Management</Link></li>
                </ul>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;

