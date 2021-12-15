function createStore(reducer, state, enhancer) {

  let _state = state;
  let _listeners = [];

  if (typeof enhancer === 'function') {
    return enhancer(createStore, reducer, state);
  }

  function getState() {
    return _state;
  }

  function dispatch(action) {
    _state = reducer(_state, action);

    _listeners.forEach(listener => {
      listener();
    });
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
