import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="page unauthorized">
            <h1>Access Denied</h1>

            <h2>403 - Unauthorized</h2>

            <p>
                You are not authorized to access this page.
            </p>

            <Link to="/dashboard">
                Return to Dashboard
            </Link>
        </div>
    );
}

export default Unauthorized;