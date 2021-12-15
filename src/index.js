function createStore(reducer, state, enhancer) {

  let _state = state;
  let _listeners = [];

  function getState() {
    return _state;
  }

  function dispatch(action) {
    _listeners.forEach(listener => {
      listener();
    });

    _state = reducer(_state, action);
  }

  function subscribe(listener) {
    _listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}
