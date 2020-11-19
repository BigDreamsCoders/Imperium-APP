import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BackHandler } from 'react-native';

import { showMessage } from 'react-native-flash-message';

import styled from 'styled-components/native';
import { TimeContext } from '../../../context/time';

import { Button } from '../../../style/button';
import colors from '../../../utils/colors';
import { ResponsiveSize } from '../../../utils/helpers';

const Text = styled.Text`
  color: ${(props) => props.color ?? colors.yellow_patito};
  font-size: ${(props) =>
    props.size ? ResponsiveSize(props.size) : ResponsiveSize(18)}px;
  text-align: center;
  font-family: 'Oswald-Bold';
`;

const CircularButton = styled(Button)`
  background-color: ${(props) => props.color ?? colors.yellow_patito};
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  width: 100%;
`;

const CountWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const fixNum = (num) => (num > 9 ? `${num}` : `0${num}`);

export function Chronometer({
  shouldStop,
  shouldRestart,
  hasSelectedWorkstation,
  selectWorkstaitonCallback,
}) {
  const { setTime } = useContext(TimeContext);
  const [milli, setMilli] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [greenText, setgreenText] = useState('Start');
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleBackButton = () => {
      showMessage({
        message: 'Debes acabar tu rutina para salir',
        type: 'warning',
        color: colors.royal_blue,
        animated: true,
        hideOnPress: true,
        titleStyle: { fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
      });
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const onStart = useCallback(() => {
    if (!hasSelectedWorkstation) {
      selectWorkstaitonCallback();
      return;
    }
    if (!isRunning) {
      if (!hasStarted) {
        setHasStarted(true);
      }
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setMilli((milliValue) => {
          if (milliValue === 99) {
            setSec((secValue) => {
              if (secValue === 59) {
                setMin((minValue) => minValue + 1);
                return 0;
              }
              return secValue + 1;
            });
            return 0;
          }
          return milliValue + 1;
        });
      }, 1);
    }
  }, [
    hasStarted,
    isRunning,
    hasSelectedWorkstation,
    selectWorkstaitonCallback,
  ]);

  const onPause = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(`${fixNum(min)}:${fixNum(sec)}:${fixNum(milli)}`);
  }, []);

  const onRestart = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setMilli(0);
    setSec(0);
    setMin(0);
  }, []);

  useEffect(() => {
    if (shouldStop) {
      onPause();
      setTime(`${fixNum(min)}:${fixNum(sec)}:${fixNum(milli)}`);
    }
    if (shouldRestart) {
      onRestart();
    }
    if (!hasSelectedWorkstation) {
      setgreenText('Maquina');
    } else {
      setgreenText('Start');
    }
  }, [
    shouldStop,
    shouldRestart,
    hasSelectedWorkstation,
    setgreenText,
    onPause,
  ]);

  return (
    <>
      <CountWrapper>
        <Text size={50}>{`${fixNum(min)}:${fixNum(sec)}:${fixNum(
          milli,
        )}`}</Text>
      </CountWrapper>
      <ButtonWrapper>
        <CircularButton color={colors.red} onPress={onPause} opa>
          <Text>Stop</Text>
        </CircularButton>
        <CircularButton color={colors.green} onPress={onStart}>
          <Text color={`${colors.yellow_patito}${isRunning ? '80' : ''}`}>
            {greenText}
          </Text>
        </CircularButton>
      </ButtonWrapper>
    </>
  );
}
