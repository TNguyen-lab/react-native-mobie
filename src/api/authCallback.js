/**
 * Holds a reference to the logout handler set by AuthProvider.
 * This allows the API layer to trigger logout when it receives a 401 response.
 */
let _onUnauthorized = null;

export const setUnauthorizedHandler = (handler) => {
  _onUnauthorized = handler;
};

export const triggerUnauthorized = () => {
  if (_onUnauthorized) {
    _onUnauthorized();
  }
};
