export const AuthReducer = (state, action) => {
  const {
    type,
    payload: { isAuth, isConfirm, user, ward },
  } = action;
  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        isLoading: false,
        isConfirm,
        isAuth,
        user,
        ward
      };
    default:
      return state;
  }
};
