export const AuthReducer = (state, action) => {
    const {
      type,
      payload: { isAuth, user ,ward},
    } = action;
    switch (type) {
      case "SET_AUTH":
        return {
          ...state,
          isLoading: false,
          isAuth,
          user,
          ward
        };
      default:
        return state;
    }
  };
  