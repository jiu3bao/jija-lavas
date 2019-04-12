/**
 * @file pageTransition module
 * @author lavas
 */
export const setToken = 'setToken'
export const setUSER_NAME = 'setUSER_NAME'
export const state = () => {
    return {
        token: '',
        user_name:''
    };
};

export const mutations = {
    [setToken] (state, token) {
        state.token = token
    },
    [setUSER_NAME] (state, name) {
        state.user_name= name
    }
};
