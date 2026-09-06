import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="page">
            <h1>RBAC Dashboard</h1>

            <div className="user-card">
                <h2>Welcome, {user.username}</h2>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
            </div>

            <nav className="navigation">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/viewer">Viewer Page</Link>

                {(user.role === "Admin" || user.role === "Editor") && (
                    <Link to="/editor">Editor Page</Link>
                )}

                {user.role === "Admin" && (
                    <Link to="/admin">Admin Page</Link>
                )}

                <button onClick={logout}>Logout</button>
            </nav>

            <div className="info">
                <h2>Role-Based Access Control</h2>

                <p>
                    Your available pages are determined by your assigned role.
                </p>

                <ul>
                    <li>Admin → Full Access</li>
                    <li>Editor → Editor + Viewer Access</li>
                    <li>Viewer → Viewer Access</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;