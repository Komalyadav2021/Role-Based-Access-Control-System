// src/components/UserManagement/UserManagement.js
import React, { useEffect, useState } from 'react';
import { addUser, updateUser, deleteUser } from '../../services/api';
import '../../styles/UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Active');
    const [editingIndex, setEditingIndex] = useState(null);
    const [sortConfig, setSortConfig] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                setUsers(storedUsers);
            } catch (error) {
                console.error('Error loading users:', error);
                alert('Failed to load users. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    useEffect(() => {
        const loadRoles = async () => {
            const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
            setRoles(storedRoles);
        };
        loadRoles();
    }, []);

    const handleAddUser = async () => {
        if (!name || !email || !role) {
            alert("All fields are required!");
            return;
        }
        const user = { name, email, role, status };
        if (editingIndex !== null) {
            await updateUser(editingIndex, user);
            const updatedUsers = [...users];
            updatedUsers[editingIndex] = user;
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setEditingIndex(null);
        } else {
            await addUser(user);
            const updatedUsers = [...users, user];
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
        
        // Clear input fields after adding/updating
        setName('');
        setEmail('');
        setRole('');
        setStatus('Active'); // Reset status to default
    };

    const handleEditUser = (index) => {
        setName(users[index].name);
        setEmail(users[index].email);
        setRole(users[index].role);
        setStatus(users[index].status);
        setEditingIndex(index);
    };

    const handleDeleteUser = async (index) => {
        await deleteUser(index);
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>User Management</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }} className="mb-4">
                <div className="form-row">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="col-md-3">
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role.roleName}>{role.roleName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary">{editingIndex !== null ? 'Update User' : 'Add User'}</button>
                    </div>
                </div>
            </form>
            <input
                type="text"
                placeholder="Search Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />
            {loading ? <p>Loading...</p> : <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('name')}>Name</th>
                        <th onClick={() => requestSort('email')}>Email</th>
                        <th onClick={() => requestSort('role')}>Role</th>
                        <th onClick={() => requestSort('status')}>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditUser(index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteUser(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
};

export default UserManagement;