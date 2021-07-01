const updateState = function updateState(self, newState) {
  const currentState = self.state;
  const updatedState = { ...currentState };

  Object.keys(updatedState).forEach((prop) => {
    if (Object.hasOwnProperty.call(newState, prop)) {
      updatedState[prop] = newState[prop];
    }
  });

  self.set('state', updatedState);
  return self;
};

export default updateState;
