function createStore(reducer, state, applyMiddleware) {
  let _state = state;
  let _listeners = [];

  if (typeof applyMiddleware === 'function') {
    return applyMiddleware(createStore, reducer, state);
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

function applyMiddleware(...middlewares) {
  return function(createStore, reducer, state) {
    let store = createStore(reducer, state);
    let funcs = middlewares.map(middleware => middleware(store));
    let dispatch = compose(funcs, store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

function compose(funcs, dispatch) {
  for (let i = funcs.length - 1; i >= 0; i--) {
    dispatch = funcs[i](dispatch);
  }
  return dispatch;
}

function bindActionCreators(actionCreators, dispatch) {
  let boundActionCreators = {};

  Object.keys(actionCreators).forEach(key => {
    boundActionCreators[key] = function (payload) {
      dispatch(actionCreators[key](payload));
    };
  })

  return boundActionCreators;
}
