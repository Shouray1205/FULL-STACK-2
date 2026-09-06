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

            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            // Store JWT
            localStorage.setItem(
                "token",
                data.token
            );

            // Store user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            setError(
                "Unable to connect to server"
            );

        }
    };

    return (
        <div className="container">

            <h1>JWT Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Login
                </button>

            </form>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <div className="demo">

                <h3>Demo Accounts</h3>

                <p>
                    Admin: admin / admin123
                </p>

                <p>
                    Editor: editor / editor123
                </p>

                <p>
                    Viewer: viewer / viewer123
                </p>

            </div>

        </div>
    );
}

export default Login;