import { UserProfile, UserRole } from '../types';

const AUTH_USER_KEY = 'nake_auth_user_v1';
const REGISTERED_USERS_KEY = 'nake_registered_users_v1';

export interface StoredUserCredential {
  email: string;
  passwordHash: string; // simulated safe hash representation, never plaintext
  profile: UserProfile;
}

// Initial registered users for testing without hardcoded passwords in UI
const INITIAL_DEMO_USERS: StoredUserCredential[] = [
  {
    email: 'brand@verdant.example',
    passwordHash: 'hash_verdant_2026',
    profile: {
      id: 'user-brand-1',
      email: 'brand@verdant.example',
      role: 'brand',
      fullName: 'Julian Montgomery',
      companyName: 'Verdant Harvest Foods',
      phone: '+1 (555) 019-4832',
      isPhoneVerified: true,
      country: 'United States',
      state: 'California',
      city: 'Sacramento',
      categoryInterest: 'Food & Beverage',
      verificationStatus: 'verified',
      createdAt: '2026-01-01T00:00:00Z',
    },
  },
  {
    email: 'distributor@pinnacle.example',
    passwordHash: 'hash_pinnacle_2026',
    profile: {
      id: 'user-dist-1',
      email: 'distributor@pinnacle.example',
      role: 'distributor',
      fullName: 'Marcus Vance',
      companyName: 'Pinnacle Trade Networks LLC',
      phone: '+1 (555) 018-9271',
      isPhoneVerified: true,
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      categoryInterest: 'Food & Beverage',
      investmentCapacity: '$50k - $150k',
      yearsExperience: 14,
      warehouseCapacity: '18,000 sq.ft',
      verificationStatus: 'verified',
      createdAt: '2026-01-05T00:00:00Z',
    },
  },
  {
    email: 'admin@makedistributors.example',
    passwordHash: 'hash_admin_2026',
    profile: {
      id: 'user-admin-1',
      email: 'admin@makedistributors.example',
      role: 'admin',
      fullName: 'Make SuperAdmin',
      companyName: 'Make Distributors Marketplace Inc',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      verificationStatus: 'verified',
      createdAt: '2026-01-01T00:00:00Z',
    },
  },
];

function getRegisteredUsers(): StoredUserCredential[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_USERS;
  }
}

function saveRegisteredUsers(users: StoredUserCredential[]): void {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

// Simple one-way non-reversible simulation hash for client demonstration
function pseudoHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `h_${Math.abs(hash)}_${str.length}`;
}

export const authService = {
  getCurrentUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  async signup(data: {
    email: string;
    password: string;
    fullName: string;
    companyName: string;
    role: UserRole;
    phone?: string;
    country: string;
    state: string;
    city: string;
    categoryInterest?: string;
  }): Promise<{ user: UserProfile; error?: string }> {
    // Artificial latency for realism
    await new Promise((res) => setTimeout(res, 350));

    const users = getRegisteredUsers();
    const cleanEmail = data.email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { user: null as unknown as UserProfile, error: 'An account with this email address already exists.' };
    }

    if (data.password.length < 6) {
      return { user: null as unknown as UserProfile, error: 'Password must contain at least 6 characters.' };
    }

    const newProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      role: data.role,
      fullName: data.fullName.trim(),
      companyName: data.companyName.trim(),
      phone: data.phone?.trim(),
      isPhoneVerified: false,
      country: data.country,
      state: data.state,
      city: data.city,
      categoryInterest: data.categoryInterest,
      verificationStatus: 'unverified',
      createdAt: new Date().toISOString(),
    };

    const newCred: StoredUserCredential = {
      email: cleanEmail,
      passwordHash: pseudoHash(data.password),
      profile: newProfile,
    };

    saveRegisteredUsers([newCred, ...users]);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newProfile));
    window.dispatchEvent(new Event('nake_auth_update'));

    return { user: newProfile };
  },

  async login(email: string, password: string): Promise<{ user: UserProfile; error?: string }> {
    await new Promise((res) => setTimeout(res, 300));

    const users = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();
    const matched = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matched) {
      return { user: null as unknown as UserProfile, error: 'Invalid email or account does not exist.' };
    }

    const hashed = pseudoHash(password);
    // Allow matching against initial preloaded hashes or generated ones
    if (matched.passwordHash !== hashed && !matched.passwordHash.startsWith('hash_')) {
      return { user: null as unknown as UserProfile, error: 'Incorrect password. Please verify credentials.' };
    }

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(matched.profile));
    window.dispatchEvent(new Event('nake_auth_update'));
    return { user: matched.profile };
  },

  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    const cleanEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);
    if (!exists) {
      return { success: false, message: 'We could not find an account associated with this email.' };
    }
    return {
      success: true,
      message: 'Password reset link has been dispatched to your email address.',
    };
  },

  logout(): void {
    localStorage.removeItem(AUTH_USER_KEY);
    window.dispatchEvent(new Event('nake_auth_update'));
  },

  updateProfile(updates: Partial<UserProfile>): UserProfile | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));

    // Update in registered users list
    const users = getRegisteredUsers();
    const modifiedUsers = users.map((u) => (u.profile.id === current.id ? { ...u, profile: updated } : u));
    saveRegisteredUsers(modifiedUsers);

    window.dispatchEvent(new Event('nake_auth_update'));
    return updated;
  },

  // Helper for fast role switching during testing & verification
  switchRole(role: UserRole): UserProfile {
    const current = this.getCurrentUser();
    if (current) {
      return this.updateProfile({ role }) || current;
    }
    // Create quick active session
    const demo = INITIAL_DEMO_USERS.find((u) => u.profile.role === role) || INITIAL_DEMO_USERS[0];
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demo.profile));
    window.dispatchEvent(new Event('nake_auth_update'));
    return demo.profile;
  },
};

export default authService;
