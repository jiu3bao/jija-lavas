/**
 * @file pageTransition module
 * @author lavas
 */

export const state = () => {
    return {
        barData: [],
        chosed_map: {}
    };
};

export const mutations = {
    SET_BAR_DATA(state, data) {
        state.barData = data
    },
    SET_CHOSED_MAP(state, data) {
        state.chosed_map = data
    }
};
