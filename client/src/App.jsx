import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Nav from './components/Nav';
import RequireAuth from './components/RequireAuth';

import HomePage from './pages/HomePage';
import GamePage, { loader as gameLoader } from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

// 3️⃣ Router singleton created
const router = createBrowserRouter([
  {
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', Component: HomePage },
      { path: '/login', Component: LoginPage },
      {
        path: '/game',
        loader: gameLoader,
        Component: () => (
          <RequireAuth>
            <GamePage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

// 4️⃣ RouterProvider added
export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <>
      <Nav />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
