# Role-Based Access Control (RBAC) UI

This project is a Role-Based Access Control (RBAC) User Interface that allows administrators to manage users, roles, and permissions efficiently. The application provides functionalities for adding, editing, and deleting users and roles, as well as assigning permissions.

## Features
- **User Management**: View, add, edit, and delete users.
- **Role Management**: Define and manage roles with associated permissions.
- **Dynamic Permissions**: Assign and modify permissions for roles.
- **Role Assignment**: Assign roles to users during user creation and editing.
- **Sorting and Filtering**: Sort users by name, email, or role, and filter users based on search input.
- **Input Validation**: Ensures that all user inputs are validated.
- **Error Handling**: Provides user-friendly error messages for API calls.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For routing in the application.
- **Bootstrap**: For styling the UI.
- **React Modal**: For modal dialogs.
- **Axios**: For making HTTP requests (if needed in the future).
- **DOMPurify**: For sanitizing HTML to prevent XSS attacks.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rbac-ui
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
   This command will install all the required dependencies listed in the `package.json` file.

3. Start the application:
   ```bash
   npm start
   ```

## Usage Guide
- Navigate to the **User Management** page to manage users.
- Navigate to the **Role Management** page to manage roles.
- Use the forms to add or edit users and roles.
- Confirm deletions using the provided modal.
- Use the search bar to filter users by name or email.
- Click on the column headers in the user table to sort users by name, email, or role.

## API Simulation
The application uses local storage to simulate API calls for CRUD operations on users and roles.

## Future Scope
- Implement real backend integration.
- Add advanced features like role hierarchy and activity logs.
- Enhance UI/UX with more creative designs.

## License
This project is licensed under the MIT License.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).# Role-Based-Access-Control-RBAC-UI
