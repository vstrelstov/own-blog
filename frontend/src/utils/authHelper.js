export const authHelper = {
    tokenStorageKey: 'accessToken',
    usernameStorageKey: 'username',

    createAuthHeader() {
        let token = sessionStorage.getItem(this.tokenStorageKey);
        if (token) {
            return {
                headers: { Authorization: `Bearer ${token}` }
            };
        }

        return undefined;
    },

    getAuthData() {
        return {
            isAuthorized: sessionStorage.getItem(authHelper.tokenStorageKey).length > 0,
            username: sessionStorage.getItem(authHelper.usernameStorageKey)
        }
    }
}