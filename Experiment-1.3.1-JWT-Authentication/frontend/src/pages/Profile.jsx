import { useEffect, useState } from "react";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        fetch(
            "http://localhost:5000/api/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => response.json())
        .then((data) => {

            if (data.user) {
                setUser(data.user);
            }

        });

    }, []);

    return (
        <div className="container">

            <h1>Profile</h1>

            {user && (
                <>
                    <p>
                        ID: {user.id}
                    </p>

                    <p>
                        Username: {user.username}
                    </p>

                    <p>
                        Role: {user.role}
                    </p>
                </>
            )}

        </div>
    );
}

export default Profile;