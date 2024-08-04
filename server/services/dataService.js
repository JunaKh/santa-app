const axios = require('axios');
const { calculateAge } = require('../utils/calculateAge');

async function getUsers() {
    const response = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');
    return response.data;
}

async function getUserProfiles() {
    const response = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');
    return response.data;
}

async function validateUserData(userid) {
    try {
        const users = await getUsers();
        const userProfiles = await getUserProfiles();

        const user = users.find((user) => user.username === userid);
        if (!user) {
            return { isValid: false, error: "User not found" };
        }

        const profile = userProfiles.find((profile) => profile.userUid === user.uid);
        if (!profile) {
            return { isValid: false, error: "User profile not found" };
        }

        const birthdate = new Date(profile.birthdate);
        if (isNaN(birthdate.getTime())) {
            return { isValid: false, error: "Invalid birthdate format" };
        }

        const age = calculateAge(birthdate);
        if (age >= 10) {
            return { isValid: false, error: "User is too old for this event" };
        }

        console.log('Profile found:', profile);
        return { isValid: true, user: { ...user, address: profile.address }, profile };
    } catch (error) {
        console.error("Error validating user data:", error);
        return { isValid: false, error: "Error validating user data" };
    }
}

module.exports = { getUsers, getUserProfiles, validateUserData };
