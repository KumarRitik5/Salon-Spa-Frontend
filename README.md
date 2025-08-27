# Salon Clinic Frontend

React.js frontend application for the Salon/Clinic Appointment Booking System.

## Features

- User registration and authentication
- Browse available services
- Book appointments online
- View and manage appointments
- Responsive design for mobile and desktop
- Role-based access (User, Admin, Owner)

## Tech Stack

- **Frontend**: React.js, React Router
- **UI**: CSS3, React Icons
- **HTTP Client**: Axios
- **State Management**: React Context API

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Deployment on Vercel

### Prerequisites
- Vercel account
- GitHub repository with your frontend code
- Backend API deployed on Render

### Steps:

1. **Create Vercel Account**: Go to [Vercel](https://vercel.com) and sign up

2. **Import GitHub Repository**: 
   - Click "New Project"
   - Import your frontend repository from GitHub
   - Vercel will auto-detect it's a React app

3. **Configure Environment Variables**:
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-render-backend-url.onrender.com`

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Important Notes:
- The `vercel.json` file is already configured for SPA routing
- Environment variables are set through Vercel dashboard
- Automatic deployments happen on every push to your main branch

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://salon-api.onrender.com` |

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Login/Register components
│   ├── layout/         # Header/Footer components
│   └── pages/          # Page components
├── context/            # React Context (AuthContext)
├── utils/              # API utilities
└── App.js              # Main app component
```

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
