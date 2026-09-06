const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "rbac_secret_key";

// Demo users
const users = [
    {
        id: 1,
        username: "admin",
        password: bcrypt.hashSync("admin123", 10),
        role: "Admin",
    },
    {
        id: 2,
        username: "editor",
        password: bcrypt.hashSync("editor123", 10),
        role: "Editor",
    },
    {
        id: 3,
        username: "viewer",
        password: bcrypt.hashSync("viewer123", 10),
        role: "Viewer",
    },
];

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "RBAC Authentication Server is running",
    });
});

// LOGIN
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password",
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({
            message: "Invalid username or password",
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    res.json({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
        },
    });
});

// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access token required",
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token",
            });
        }

        req.user = user;
        next();
    });
}

// Role authorization middleware
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied. You are not authorized.",
            });
        }

        next();
    };
}

// Dashboard - all authenticated users
app.get(
    "/api/dashboard",
    authenticateToken,
    (req, res) => {
        res.json({
            message: "Welcome to the dashboard",
            user: req.user,
        });
    }
);

// Viewer route - all roles
app.get(
    "/api/viewer",
    authenticateToken,
    authorizeRoles("Admin", "Editor", "Viewer"),
    (req, res) => {
        res.json({
            message: "Welcome to the Viewer Page",
            user: req.user,
        });
    }
);

// Editor route - Admin + Editor
app.get(
    "/api/editor",
    authenticateToken,
    authorizeRoles("Admin", "Editor"),
    (req, res) => {
        res.json({
            message: "Welcome to the Editor Page",
            user: req.user,
        });
    }
);

// Admin route - Admin only
app.get(
    "/api/admin",
    authenticateToken,
    authorizeRoles("Admin"),
    (req, res) => {
        res.json({
            message: "Welcome to the Admin Page",
            user: req.user,
        });
    }
);

app.listen(PORT, () => {
    console.log(`RBAC Server running on http://localhost:${PORT}`);
});