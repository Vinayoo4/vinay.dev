const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const adminData = {
    name: 'Vinay',
    email: 'dev.webstylevinay9994@gmail.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(__dirname, '..', 'data', 'admin.json');
  fs.writeFileSync(filePath, JSON.stringify(adminData, null, 2));
  console.log('Admin user created in data/admin.json');
  console.log('Email: dev.webstylevinay9994@gmail.com');
  console.log('Password: admin123');
}

createAdmin().catch(console.error);
