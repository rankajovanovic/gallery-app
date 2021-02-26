export const getters = {
  activeUser: (state) => state.activeUser,
  isAuthenticated: (state) => !!state.token,
  user_id: (state) => state.user_id
};
