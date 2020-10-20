export function login(data) {
  return {
    type: '@user/LOGIN',
    data,
  };
}

export function logout() {
  return {
    type: '@user/LOGOUT',
  };
}
