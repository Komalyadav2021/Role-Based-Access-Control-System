//    // src/App.js
//    import React, { useState } from 'react';
//     import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//    import DashboardLayout from './components/DashboardLayout';
//    import UserManagement from './components/UserManagement/UserManagement';
//    import RoleManagement from './components/RoleManagement/RoleManagement';
//    import PermissionManagement from './components/PermissionManagement/PermissionManagement';
//    import './styles/common.css';
//    import { login } from './services/api';

//    const App = () => {
//        const [userRole, setUserRole] = useState('guest'); // Default role

//        const handleLogin = () => {
//            // Simulate a login and set the user role
//            if (login('admin', 'password')) {
//                setUserRole('admin'); // Set user role to admin after successful login
//            }
//        };

//        return (
//            <Router>
//                <div>
//                    <button onClick={handleLogin} className="btn btn-primary">
//                        Login as Admin
//                    </button>
//                    <Routes>
//                        <Route path="/" element={<DashboardLayout userRole={userRole} />}>
//                            <Route path="users" element={userRole === 'admin' ? <UserManagement /> : <NotAuthorized />} />
//                            <Route path="roles" element={userRole === 'admin' ? <RoleManagement /> : <NotAuthorized />} />
//                            <Route path="permissions" element={userRole === 'admin' ? <PermissionManagement /> : <NotAuthorized />} />
//                        </Route>
//                    </Routes>
//                </div>
//            </Router>
//        );
//    };

//    const NotAuthorized = () => <div>You are not authorized to view this page.</div>;

//    export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import DashboardLayout from './components/DashboardLayout';
// import UserManagement from './components/UserManagement/UserManagement';
// import RoleManagement from './components/RoleManagement/RoleManagement';
// import PermissionManagement from './components/PermissionManagement/PermissionManagement';
// import './styles/common.css';
// import { login } from './services/api';

// const App = () => {
//     const [userRole, setUserRole] = useState('guest'); // Default role

//     const handleLogin = () => {
//         if (login('admin', 'password')) {
//             setUserRole('admin'); // Set user role to admin after successful login
//         }
//     };

//     return (
//         <Router>
//             <div>
//                 <div className="login-container">
//                     <button onClick={handleLogin} className="btn btn-primary">
//                         Login as Admin
//                     </button>
//                 </div>
//                 <Routes>
//                     <Route path="/" element={<DashboardLayout userRole={userRole} />}>
//                         <Route path="users" element={userRole === 'admin' ? <UserManagement /> : <NotAuthorized />} />
//                         <Route path="roles" element={userRole === 'admin' ? <RoleManagement /> : <NotAuthorized />} />
//                         <Route path="permissions" element={userRole === 'admin' ? <PermissionManagement /> : <NotAuthorized />} />
//                     </Route>
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// const NotAuthorized = () => <div>You are not authorized to view this page.</div>;

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import UserManagement from './components/UserManagement/UserManagement';
import RoleManagement from './components/RoleManagement/RoleManagement';
import PermissionManagement from './components/PermissionManagement/PermissionManagement';
import './styles/common.css';
import { login } from './services/api';

const App = () => {
    const [userRole, setUserRole] = useState('guest'); // Default role

    const handleLogin = () => {
        if (login('admin', 'password')) {
            setUserRole('admin'); // Set user role to admin after successful login
        }
    };

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="navbar-brand">RBAC System</div>
                    <div className="navbar-buttons">
                        <button onClick={handleLogin} className="btn btn-primary">
                            Login as Admin
                        </button>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<DashboardLayout userRole={userRole} />}>
                        <Route path="users" element={userRole === 'admin' ? <UserManagement /> : <NotAuthorized />} />
                        <Route path="roles" element={userRole === 'admin' ? <RoleManagement /> : <NotAuthorized />} />
                        <Route path="permissions" element={userRole === 'admin' ? <PermissionManagement /> : <NotAuthorized />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

const NotAuthorized = () => <div>You are not authorized to view this page.</div>;

export default App;
