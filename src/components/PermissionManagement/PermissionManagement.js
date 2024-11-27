import React, { useEffect, useState } from 'react';
import '../../styles/PermissionManagement.css'; // Import the CSS file

const PermissionManagement = () => {
    const [permissions, setPermissions] = useState([]);
    const [permissionName, setPermissionName] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        const loadPermissions = async () => {
            const storedPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
            setPermissions(storedPermissions);
        };
        loadPermissions();
    }, []);

    const handleAddPermission = async (e) => {
        e.preventDefault();
        if (!permissionName) return;

        const normalizedPermissionName = permissionName.trim().toLowerCase();
        const isDuplicate = permissions.some(p => p.toLowerCase() === normalizedPermissionName);
        if (isDuplicate) {
            alert("This permission already exists.");
            return;
        }

        if (editingIndex !== null) {
            // Update existing permission
            const updatedPermissions = [...permissions];
            updatedPermissions[editingIndex] = normalizedPermissionName;
            setPermissions(updatedPermissions);
            localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
            setEditingIndex(null);
        } else {
            // Add new permission
            const updatedPermissions = [...permissions, normalizedPermissionName];
            setPermissions(updatedPermissions);
            localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
        }

        setPermissionName('');
    };

    const handleEditPermission = (index) => {
        setPermissionName(permissions[index]);
        setEditingIndex(index);
    };

    const handleDeletePermission = async (index) => {
        const updatedPermissions = permissions.filter((_, i) => i !== index);
        setPermissions(updatedPermissions);
        localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
    };

    return (
        <div className="container mt-4">
            <h2>Permission Management</h2>
            <form onSubmit={handleAddPermission} className="mb-4">
                <div className="form-row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Permission Name"
                            value={permissionName}
                            onChange={(e) => setPermissionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">{editingIndex !== null ? 'Update Permission' : 'Add Permission'}</button>
                    </div>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Permission Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map((permission, index) => (
                        <tr key={index}>
                            <td>{permission}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditPermission(index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeletePermission(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PermissionManagement;