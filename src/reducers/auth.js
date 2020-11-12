export const actions = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export function AuthReducer(prevState, { type, token, user }) {
  switch (type) {
    case actions.RESTORE_TOKEN:
      return {
        ...prevState,
        token,
        user,
        isLoading: false,
      };
    case actions.LOGIN:
      return {
        ...prevState,
        token: token,
        isLogout: false,
      };
    case actions.LOGOUT:
      return {
        ...prevState,
        token: null,
        isLoading: false,
        isLogout: true,
      };
  }
}

export const InitialState = {
  token: null,
  user: null,
  isLoading: true,
  isLogout: false,
};
