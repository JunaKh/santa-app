import axios from 'axios';

const usersUrl = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
const profilesUrl = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';

export async function getUsers() {
  const response = await axios.get(usersUrl);
  return response.data;
}

export async function getUserProfiles() {
  const response = await axios.get(profilesUrl);
  return response.data;
}

interface User {
  username: string;
  uid: string;
  address?: string;
}

interface Profile {
  userUid: string;
  birthdate: string;
  address: string;
}

interface ValidationResult {
  isValid: boolean;
  user?: User;
  profile?: Profile;
  error?: string;
}

export async function validateUserData(username: string): Promise<ValidationResult> {
  try {
    const users: User[] = await getUsers();
    const profiles: Profile[] = await getUserProfiles();

    const user = users.find(u => u.username === username);
    if (!user) {
      return { isValid: false, error: 'User not found' };
    }

    const profile = profiles.find(p => p.userUid === user.uid);
    if (!profile) {
      return { isValid: false, error: 'User profile not found' };
    }

    const birthdate = new Date(profile.birthdate);
    if (isNaN(birthdate.getTime())) {
      return { isValid: false, error: 'Invalid birthdate format' };
    }

    const age = calculateAge(birthdate);
    if (age >= 10) {
      return { isValid: false, error: 'User is too old for this event' };
    }

    return {
      isValid: true,
      user: { ...user, address: profile.address },
    };
  } catch (error) {
    return { isValid: false, error: 'Error validating user data' };
  }
}

function calculateAge(birthdate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}
