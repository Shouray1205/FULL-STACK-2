const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Demo users
const users = [
    {
        id: 1,
        username: "admin",
        password: bcrypt.hashSync("admin123", 10),
        role: "Admin"
    },
    {
        id: 2,
        username: "editor",
        password: bcrypt.hashSync("editor123", 10),
        role: "Editor"
    },
    {
        id: 3,
        username: "viewer",
        password: bcrypt.hashSync("viewer123", 10),
        role: "Viewer"
    }
];

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "JWT Authentication Server is running"
    });
});

// LOGIN
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        // Find user
        const user = users.find(
            (u) => u.username === username
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Check password
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Middleware for JWT verification
function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    // Expected:
    // Authorization: Bearer TOKEN

    if (!authHeader) {
        return res.status(401).json({
            message: "Access token required"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid authorization format"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "Invalid or expired token"
        });

    }
}

// Protected route
app.get(
    "/api/profile",
    authenticateToken,
    (req, res) => {

        res.json({
            message: "You accessed a protected route",
            user: req.user
        });

    }
);

// Another protected route
app.get(
    "/api/dashboard",
    authenticateToken,
    (req, res) => {

        res.json({
            message: "Welcome to the dashboard",
            user: req.user
        });

    }
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});