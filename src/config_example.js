export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = '7d2b81525b4544c8af073a777bed79fc';
export const redirectUri = 'http://localhost:3000/redirect';
export const scopes = [
	'user-top-read',
	'user-read-currently-playing',
	'user-read-playback-state',
	'user-modify-playback-state'
];
