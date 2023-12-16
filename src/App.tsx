import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import UsersPage from "./pages/UsersPage";
import StudentsPage from "./pages/StudentsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <AuthPage />,
    },
    {
        path: "/utilisateurs",
        element: <UsersPage />,
    },
    {
        path: "/effectifs",
        element: <StudentsPage />,
    },
]);

function App() {
    return (
        <>
            {/* This will be the component for the Navigation */}
            <RouterProvider router={router} />
        </>
    );
}

export default App;
