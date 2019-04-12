/**
 * @file pageTransition module
 * @author lavas
 */
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_NAME = 'SET_USER_NAME';

export const state = () => {
    return {
        barData: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},],
    };
};

export const mutations = {
    [SET_TOKEN] (state, data) {
        state.token = data
        console.log(data,123123232)
    },
    [SET_USER_NAME] (state, data) {
        state.user_name= data
    }
};
