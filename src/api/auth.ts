const TOKEN_KEY = 'Asg_Authorization_Token';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
    return localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
}