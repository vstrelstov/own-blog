export const authHelper = {
    createAuthHeader() {
        let token = sessionStorage.getItem('accessToken');
        if (token) {
            return {
                headers: { Authorization: `Bearer ${token}` }
            };
        }

        return undefined;
    }
}