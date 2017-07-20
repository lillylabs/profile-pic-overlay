import Facebook from '../services/facebook.service';

export const state = () => ({
  available: false,
  initialized: false,
  connected: false,
  authResponse: null,
  publishActions: false
});

export const mutations = {
  available(state) {
    state.available = true;
  },
  initialized(state) {
    state.initialized = true;
  },
  response(state, response) {
    state.connected = response.status === 'connected';
    state.authResponse = response.authResponse;
  },
  permissions(state, permissions) {
    for (var entry of permissions) {
      if (entry.permission === 'publish_actions' && entry.status === 'granted') {
        state.publishActions = true;
      }
    }
  }
};

export const actions = {
  loginStatus({ commit }) {
    Facebook.loginStatus().then(result => {
      commit('response', result.response);
      commit('permissions', result.permissions);
      commit('initialized');
    });
  }
};
