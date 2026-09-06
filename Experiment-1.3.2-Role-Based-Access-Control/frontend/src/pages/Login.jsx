import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");
        } catch (error) {
            setError("Unable to connect to server");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>RBAC Login</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

                {error && <p className="error">{error}</p>}

                <div className="demo">
                    <h2>Demo Accounts</h2>

                    <p>
                        <strong>Admin:</strong> admin / admin123
                    </p>

                    <p>
                        <strong>Editor:</strong> editor / editor123
                    </p>

                    <p>
                        <strong>Viewer:</strong> viewer / viewer123
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;