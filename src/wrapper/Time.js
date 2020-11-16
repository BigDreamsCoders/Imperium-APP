import React, { useMemo, useReducer } from 'react';
import { TimeContext } from '../context/time';
import { TimeReducer, InitialState, actions } from './../reducers/time';

export function TimeWrapper({ children }) {
  const [state, dispatch] = useReducer(TimeReducer, InitialState);

  const timeContext = useMemo(
    () => ({
      setTime: (time) => {
        dispatch({ type: actions.SET_TIME, time });
      },
      time: state.time,
    }),
    [state],
  );

  return (
    <TimeContext.Provider value={timeContext}>{children}</TimeContext.Provider>
  );
}
