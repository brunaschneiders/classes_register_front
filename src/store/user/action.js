export function login(data) {
  return {
    type: '@user/LOGIN',
    data,
  };
}

export function logout(data) {
  return {
    type: '@user/LOGOUT',
    data,
  };
}
