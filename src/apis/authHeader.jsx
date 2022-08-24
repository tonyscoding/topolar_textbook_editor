const getAuthHeader = (token) => {
    if (token) {
        if (!token) {
            return null;
        }
        return {headers: {'Authorization': `Token ${token}`}};
    }
}

export default getAuthHeader;