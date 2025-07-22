// Mock Discord API and backend functionality
export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
  verified?: boolean;
}

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
  memberCount?: number;
  hasBot?: boolean;
}

export interface GuildSettings {
  guildId: string;
  prefix: string;
  welcomeMessage: string;
  welcomeChannel: string | null;
  moderationEnabled: boolean;
  autoDeleteSpam: boolean;
  logChannel: string | null;
  logEvents: string[];
}

// Mock data storage
const STORAGE_KEYS = {
  USER: 'discord_user',
  TOKEN: 'discord_token',
  GUILDS: 'user_guilds',
  GUILD_SETTINGS: 'guild_settings'
};

// Mock Discord OAuth2 URL
const DISCORD_CLIENT_ID = '934456688306683925';
const DISCORD_REDIRECT_URI = `${window.location.origin}/auth/callback`;
const DISCORD_SCOPES = 'identify guilds';

export function getDiscordAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: DISCORD_SCOPES,
  });
  
  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '123456789012345678',
    username: 'TryHardUser',
    discriminator: '0001',
    avatar: 'https://cdn.discordapp.com/avatars/123456789012345678/avatar.png',
    email: 'user@example.com',
    verified: true
  }
];

// Mock guild data
const mockGuilds: Guild[] = [
  {
    id: '123456789',
    name: 'Gaming Paradise',
    icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop&crop=center',
    owner: true,
    permissions: '2147483647', // Administrator
    features: ['COMMUNITY', 'NEWS'],
    memberCount: 1250,
    hasBot: true
  },
  {
    id: '987654321',
    name: 'Study Group',
    icon: null,
    owner: false,
    permissions: '32', // Manage Server
    features: [],
    memberCount: 45,
    hasBot: true
  },
  {
    id: '456789123',
    name: 'Art Community Hub',
    icon: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center',
    owner: false,
    permissions: '8', // Send Messages
    features: ['COMMUNITY'],
    memberCount: 890,
    hasBot: false
  },
  {
    id: '789123456',
    name: 'Tech Talk Central',
    icon: null,
    owner: true,
    permissions: '2147483647',
    features: ['COMMUNITY', 'DISCOVERABLE'],
    memberCount: 2100,
    hasBot: true
  }
];

// Mock guild settings
const defaultGuildSettings: Record<string, GuildSettings> = {
  '123456789': {
    guildId: '123456789',
    prefix: '!',
    welcomeMessage: 'Welcome to Gaming Paradise, {user}! Check out #rules to get started.',
    welcomeChannel: '123456789012345679',
    moderationEnabled: true,
    autoDeleteSpam: true,
    logChannel: '123456789012345680',
    logEvents: ['messageDelete', 'memberJoin', 'memberLeave']
  },
  '987654321': {
    guildId: '987654321',
    prefix: '?',
    welcomeMessage: 'Welcome {user}! Ready to study?',
    welcomeChannel: null,
    moderationEnabled: false,
    autoDeleteSpam: false,
    logChannel: null,
    logEvents: []
  },
  '789123456': {
    guildId: '789123456',
    prefix: '$',
    welcomeMessage: 'Welcome to Tech Talk Central, {user}! Share your coding journey with us.',
    welcomeChannel: '789123456012345679',
    moderationEnabled: true,
    autoDeleteSpam: true,
    logChannel: '789123456012345680',
    logEvents: ['messageDelete', 'memberJoin', 'memberLeave', 'messageEdit']
  }
};

// Initialize mock data in localStorage if not present
function initializeMockData() {
  if (!localStorage.getItem(STORAGE_KEYS.GUILD_SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.GUILD_SETTINGS, JSON.stringify(defaultGuildSettings));
  }
}

// Auth functions
export function isLoggedIn(): boolean {
  return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function getCurrentUser(): User | null {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
}

export function login(): void {
  window.location.href = getDiscordAuthUrl();
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.GUILDS);
}

// Mock OAuth2 callback handler
export async function handleAuthCallback(code: string): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful authentication
  const mockUser = mockUsers[0];
  const mockToken = 'mock_access_token_' + Date.now();
  
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
  localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
  localStorage.setItem(STORAGE_KEYS.GUILDS, JSON.stringify(mockGuilds));
  
  initializeMockData();
  
  return mockUser;
}

// Guild functions
export async function getUserGuilds(): Promise<Guild[]> {
  if (!isLoggedIn()) {
    throw new Error('Not authenticated');
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const guildsData = localStorage.getItem(STORAGE_KEYS.GUILDS);
  return guildsData ? JSON.parse(guildsData) : [];
}

export async function getGuildSettings(guildId: string): Promise<GuildSettings> {
  if (!isLoggedIn()) {
    throw new Error('Not authenticated');
  }
  
  // Check if user has permission to manage this guild
  const guilds = await getUserGuilds();
  const guild = guilds.find(g => g.id === guildId);
  
  if (!guild) {
    throw new Error('Guild not found');
  }
  
  const hasManagePermission = guild.owner || (parseInt(guild.permissions) & 32) === 32; // Manage Server permission
  if (!hasManagePermission) {
    throw new Error('Insufficient permissions');
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.GUILD_SETTINGS) || '{}');
  return allSettings[guildId] || {
    guildId,
    prefix: '!',
    welcomeMessage: 'Welcome {user}!',
    welcomeChannel: null,
    moderationEnabled: false,
    autoDeleteSpam: false,
    logChannel: null,
    logEvents: []
  };
}

export async function updateGuildSettings(guildId: string, settings: Partial<GuildSettings>): Promise<GuildSettings> {
  if (!isLoggedIn()) {
    throw new Error('Not authenticated');
  }
  
  // Check permissions
  const guilds = await getUserGuilds();
  const guild = guilds.find(g => g.id === guildId);
  
  if (!guild) {
    throw new Error('Guild not found');
  }
  
  const hasManagePermission = guild.owner || (parseInt(guild.permissions) & 32) === 32;
  if (!hasManagePermission) {
    throw new Error('Insufficient permissions');
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.GUILD_SETTINGS) || '{}');
  const currentSettings = allSettings[guildId] || {
    guildId,
    prefix: '!',
    welcomeMessage: 'Welcome {user}!',
    welcomeChannel: null,
    moderationEnabled: false,
    autoDeleteSpam: false,
    logChannel: null,
    logEvents: []
  };
  
  const updatedSettings = { ...currentSettings, ...settings, guildId };
  allSettings[guildId] = updatedSettings;
  
  localStorage.setItem(STORAGE_KEYS.GUILD_SETTINGS, JSON.stringify(allSettings));
  
  return updatedSettings;
}

// Bot functions
export async function inviteBot(guildId?: string): Promise<void> {
  const permissions = '1099511627775'; // All permissions the bot needs
  const clientId = DISCORD_CLIENT_ID;
  
  let url = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&integration_type=0&scope=bot+applications.commands`;
  
  if (guildId) {
    url += `&guild_id=${guildId}`;
  }
  
  window.open(url, '_blank');
}

// Bot status check
export async function checkBotStatus(): Promise<{ online: boolean; servers: number; users: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    online: true,
    servers: 150,
    users: 50000
  };
}