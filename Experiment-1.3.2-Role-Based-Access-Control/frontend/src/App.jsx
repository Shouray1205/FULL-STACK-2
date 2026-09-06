import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Dashboard - All authenticated users */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={["Admin", "Editor", "Viewer"]}
                        >
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Viewer - All roles */}
                <Route
                    path="/viewer"
                    element={
                        <ProtectedRoute
                            allowedRoles={["Admin", "Editor", "Viewer"]}
                        >
                            <Viewer />
                        </ProtectedRoute>
                    }
                />

                {/* Editor - Admin + Editor */}
                <Route
                    path="/editor"
                    element={
                        <ProtectedRoute
                            allowedRoles={["Admin", "Editor"]}
                        >
                            <Editor />
                        </ProtectedRoute>
                    }
                />

                {/* Admin - Admin only */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            allowedRoles={["Admin"]}
                        >
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                {/* Unauthorized */}
                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;