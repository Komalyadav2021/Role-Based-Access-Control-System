// src/services/api.js
let users = [];
let roles = [];
let permissions = [];
let token = null;

// User API
export const fetchUsers = async () => {
    try {
        const response = await fetch('/api/users'); // Example API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};

export const addUser = (user) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            users.push(user);
            resolve(user);
        }, 500);
    });
};

export const updateUser = (index, user) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            users[index] = user;
            resolve(user);
        }, 500);
    });
};

export const deleteUser = (index) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            users.splice(index, 1);
            resolve();
        }, 500);
    });
};

// Role API
export const fetchRoles = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(roles);
        }, 1000);
    });
};

export const addRole = (role) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                roles.push(role);
                resolve(role);
            } catch (error) {
                console.error('Error adding role:', error);
                reject('Failed to add role');
            }
        }, 500);
    });
};

export const updateRole = (index, role) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (index < 0 || index >= roles.length) {
                    throw new Error('Index out of bounds');
                }
                roles[index] = role;
                resolve(role);
            } catch (error) {
                console.error('Error updating role:', error);
                reject('Failed to update role');
            }
        }, 500);
    });
};

export const deleteRole = (index) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (index < 0 || index >= roles.length) {
                    throw new Error('Index out of bounds');
                }
                roles.splice(index, 1);
                resolve();
            } catch (error) {
                console.error('Error deleting role:', error);
                reject('Failed to delete role');
            }
        }, 500);
    });
};

// Permission API
export const fetchPermissions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(permissions);
        }, 1000);
    });
};

export const addPermission = (permission) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            permissions.push(permission);
            resolve(permission);
        }, 500);
    });
};

export const updatePermission = (index, permission) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            permissions[index] = permission;
            resolve(permission);
        }, 500);
    });
};

export const deletePermission = (index) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            permissions.splice(index, 1);
            resolve();
        }, 500);
    });
};

export const login = (username, password) => {
    // Simulate a login
    if (username === 'admin' && password === 'password') {
        token = 'mock-token'; // Set a mock token
        return true;
    }
    return false;
};

export const isAuthenticated = () => {
    return token !== null;
};