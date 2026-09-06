function Viewer() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="page">
            <h1>Viewer Page</h1>

            <div className="role-box">
                <h2>Welcome, {user.username}!</h2>
                <p>You have viewer permissions.</p>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
            </div>
        </div>
    );
}

export default Viewer;