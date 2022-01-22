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
    }
}