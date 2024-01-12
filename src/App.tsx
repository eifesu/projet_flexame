import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UsersPage from "./pages/(admin)/users/page";
import StudentsPage from "./pages/(admin)/students/page";
import AuthPage from "./pages/auth/page";
import ExamPage from "./pages/(surveillant)/exams/page";
import GradesPage from "./pages/(correcteur)/grades/page";
// import ExamPage from "./pages/ExamPage";

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
    {
        path: "/examens",
        element: <ExamPage />,
    },
    {
        path: "/grades",
        element: <GradesPage />,
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
