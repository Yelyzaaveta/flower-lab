const db = require("../config/db");

const Admin = {
  /**
   * Find an admin by email.
   */
  async findByEmail(email) {
    const sql = "SELECT id, email, password, role FROM admins WHERE email = $1";
    const { rows } = await db.query(sql, [email]);
    return rows[0] || null;
  },
};

module.exports = Admin;
