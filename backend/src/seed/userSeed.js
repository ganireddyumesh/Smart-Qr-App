const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    try {
        const users = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'manager', password: 'manager123', role: 'manager' }
        ];

        for (const u of users) {
            const exists = await User.findOne({ username: u.username });
            if (!exists) {
                const hashedPassword = await bcrypt.hash(u.password, 10);
                await User.create({ ...u, password: hashedPassword });
                console.log(`Created user: ${u.username}`);
            } else {
                console.log(`User ${u.username} already exists`);
            }
        }
    } catch (error) {
        console.error('User seeding error:', error);
    }
};

module.exports = seedUsers;
