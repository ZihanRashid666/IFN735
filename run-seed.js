/**
 * run-seed.js
 * Creates the first Administrative Administrator account.
 * Run once after schema setup: npm run seed
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
const pool   = require('./backend/config/db');

async function seed() {
  try {
    const password = 'Admin@1234';
    const hash     = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role_id, department_id)
       VALUES (?, ?, ?, ?, 1, 1)`,
      ['System', 'Admin', 'admin@dost.gov.ph', hash]
    );

    console.log('');
    console.log('✅  Seed admin created successfully.');
    console.log('    Email    : admin@dost.gov.ph');
    console.log('    Password : Admin@1234');
    console.log('    ⚠️  Change this password immediately after first login.');
    console.log('');
    process.exit(0);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      console.log('ℹ️  Admin user already exists. Skipping seed.');
      process.exit(0);
    }
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
