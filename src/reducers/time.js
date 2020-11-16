export const actions = {
  SET_TIME: 'RESTORE_TOKEN',
};

export function TimeReducer(prevState, { type, time }) {
  switch (type) {
    case actions.SET_TIME:
      return {
        ...prevState,
        time,
      };
  }
}

export const InitialState = {
  time: undefined,
};
