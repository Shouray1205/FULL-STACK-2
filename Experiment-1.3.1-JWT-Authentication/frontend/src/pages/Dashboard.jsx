import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <div className="container">

            <h1>Dashboard</h1>

            <h2>
                Welcome, {user?.username}
            </h2>

            <p>
                Role:
                <strong> {user?.role}</strong>
            </p>

            <hr />

            {/* Admin Button */}

            {user?.role === "Admin" && (

                <button
                    onClick={() =>
                        navigate("/admin")
                    }
                >
                    Admin Panel
                </button>

            )}


            {/* Editor Button */}

            {(user?.role === "Admin" ||
                user?.role === "Editor") && (

                <button
                    onClick={() =>
                        navigate("/editor")
                    }
                >
                    Editor Panel
                </button>

            )}


            {/* Viewer Button */}

            <button
                onClick={() =>
                    navigate("/viewer")
                }
            >
                View Content
            </button>


            <button
                onClick={() =>
                    navigate("/profile")
                }
            >
                Profile
            </button>


            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default Dashboard;