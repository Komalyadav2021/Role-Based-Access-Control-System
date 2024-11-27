import React, { useEffect, useReducer } from 'react';
import '../../styles/RoleManagement.css'; // Update the path to the new location

const initialState = {
    roles: [],
    roleName: '',
    description: '',
    permissions: '',
    editingIndex: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ROLES':
            return { ...state, roles: action.payload };
        case 'SET_ROLE_NAME':
            return { ...state, roleName: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_PERMISSIONS':
            return { ...state, permissions: action.payload };
        case 'SET_EDITING_INDEX':
            return { ...state, editingIndex: action.payload };
        case 'RESET':
            return { ...state, roleName: '', description: '', permissions: '', editingIndex: null };
        default:
            return state;
    }
};

const RoleManagement = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadRoles = async () => {
            const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
            dispatch({ type: 'SET_ROLES', payload: storedRoles });
        };
        loadRoles();
    }, []);

    const handleAddRole = async (e) => {
        e.preventDefault();
        if (!state.roleName || !state.description || !state.permissions) return;

        const role = {
            roleName: state.roleName,
            description: state.description,
            permissions: state.permissions,
        };

        if (state.editingIndex !== null) {
            // Update existing role
            const updatedRoles = [...state.roles];
            updatedRoles[state.editingIndex] = role;
            dispatch({ type: 'SET_ROLES', payload: updatedRoles });
            localStorage.setItem('roles', JSON.stringify(updatedRoles));
            dispatch({ type: 'RESET' });
        } else {
            // Add new role
            const updatedRoles = [...state.roles, role];
            dispatch({ type: 'SET_ROLES', payload: updatedRoles });
            localStorage.setItem('roles', JSON.stringify(updatedRoles));
        }
    };

    const handleEditRole = (index) => {
        const role = state.roles[index];
        dispatch({ type: 'SET_ROLE_NAME', payload: role.roleName });
        dispatch({ type: 'SET_DESCRIPTION', payload: role.description });
        dispatch({ type: 'SET_PERMISSIONS', payload: role.permissions });
        dispatch({ type: 'SET_EDITING_INDEX', payload: index });
    };

    const handleDeleteRole = async (index) => {
        const updatedRoles = state.roles.filter((_, i) => i !== index);
        dispatch({ type: 'SET_ROLES', payload: updatedRoles });
        localStorage.setItem('roles', JSON.stringify(updatedRoles));
    };

    return (
        <div className="container mt-4">
            <h2>Role Management</h2>
            <form onSubmit={(e) => { handleAddRole(e); }} className="mb-4">
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Role Name" value={state.roleName} onChange={(e) => dispatch({ type: 'SET_ROLE_NAME', payload: e.target.value })} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Description" value={state.description} onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Permissions (comma-separated)" value={state.permissions} onChange={(e) => dispatch({ type: 'SET_PERMISSIONS', payload: e.target.value })} required />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">{state.editingIndex !== null ? 'Update Role' : 'Add Role'}</button>
                    </div>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Description</th>
                        <th>Permissions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {state.roles.map((role, index) => (
                        <tr key={index}>
                            <td>{role.roleName}</td>
                            <td>{role.description}</td>
                            <td>{role.permissions}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditRole(index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteRole(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleManagement;