import React, { Component, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import styled from 'styled-components/native';
import { Button } from '../../../style/button';
import { Container } from '../../../style/layouts';
import colors from '../../../utils/colors';

const Text = styled.Text`
  color: ${(props) => props.color ?? colors.yellow_patito};
  font-size: ${(props) => props.size ?? 24}px;
  font-weight: bold;
  text-align: center;
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
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const fixNum = (num) => (num > 9 ? `${num}` : `0${num}`);

export class Chronometer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milli: 0,
      sec: 0,
      min: 0,
      running: false,
      hasStarted: false,
    };
    this.onStart = this.onStart.bind(this);
    this.onPause = this.onPause.bind(this);
    this.interval = null;
  }

  onStart() {
    const { running, hasStarted } = this.state;
    if (!running) {
      const newState = { running: true };
      if (!hasStarted) newState.hasStarted = true;
      console.log(newState);
      this.setState(newState, () => {
        this.interval = setInterval(() => {
          const { milli, sec, min } = this.state;
          if (milli !== 99) {
            this.setState({
              milli: milli + 1,
            });
          } else if (sec !== 59) {
            this.setState({
              milli: 0,
              sec: sec + 1,
            });
          } else {
            this.setState({
              milli: 0,
              sec: 0,
              min: min + 1,
            });
          }
        }, 1);
      });
    }
  }

  onPause() {
    clearInterval(this.interval);
    this.setState({ running: false });
  }

  handleBackButton() {
    showMessage({
      message: 'Debes acabar tu rutina para salir',
      type: 'warning',
      color: colors.royal_blue,
      animated: true,
      hideOnPress: true,
      titleStyle: { fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
    });
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    const { milli, min, sec, hasStarted, running } = this.state;
    console.log(hasStarted);
    return (
      <Container>
        <CountWrapper>
          <Text size={96}>{`${fixNum(min)}:${fixNum(sec)}:${fixNum(
            milli,
          )}`}</Text>
        </CountWrapper>
        <ButtonWrapper>
          <CircularButton color={colors.red} onPress={this.onPause} opa>
            <Text>Stop</Text>
          </CircularButton>
          <CircularButton color={colors.green} onPress={this.onStart}>
            <Text color={`${colors.yellow_patito}${running ? '80' : ''}`}>
              {hasStarted ? 'Resume' : 'Start'}
            </Text>
          </CircularButton>
        </ButtonWrapper>
      </Container>
    );
  }
}
