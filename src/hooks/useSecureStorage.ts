import RNStorage from 'rn-secure-storage';

export const useSecureStorage = () => {
    const setToken = async (token: string) => {
        try {
            await RNStorage.setItem('FAKETOKEN', token, {});
        } catch (error) {
            return error;
        }
    }
    return { setToken };
}