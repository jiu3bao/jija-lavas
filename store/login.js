/**
 * @file pageTransition module
 * @author lavas
 */
export const setToken = 'setToken'
export const setUSER_NAME = 'setUSER_NAME'
export const state = () => {
    return {
        token: '',
        user_name:'',
        user_id:''
    };
};

export const mutations = {
    [setToken] (state, token) {
        state.token = token
        //state.token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiZXhwIjoxNTU1NjQwMzA4LCJuYmYiOjE1NTU1NTM5MDh9.bnac7MF4SqPSV0mv-FtSb0LI0KS0Ds0JiNPKd_dO0SE'
    },
    [setUSER_NAME] (state, name) {
        state.user_name= name
    },
    setUSER_ID(state, data) {
        state.user_id = data
    }
};
