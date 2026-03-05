const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const authController = {
  /**
   * POST /auth/login
   * Admin login — returns JWT token (24h expiry).
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: "Email and password are required",
          },
        });
      }

      const admin = await Admin.findByEmail(email);

      if (!admin) {
        return res.status(401).json({
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          },
        });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          },
        });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
      );

      res.json({
        data: {
          token,
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /auth/logout
   * Logout — stateless, just returns 200.
   */
  async logout(req, res) {
    res.json({ message: "Logged out successfully" });
  },
};

module.exports = authController;
