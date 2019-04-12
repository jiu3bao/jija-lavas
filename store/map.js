/**
 * @file pageTransition module
 * @author lavas
 */

export const state = () => {
    return {
        barData: [],
    };
};

export const mutations = {
    SET_BAR_DATA(state, data) {
        state.barData = data
    }
};
