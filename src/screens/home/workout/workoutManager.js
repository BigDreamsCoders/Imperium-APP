import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon, Input } from 'react-native-elements';
import { Loader } from '../../../components/loader';
import { AuthContext } from '../../../context/auth';
import { getRoutineById } from '../../../api/routine';
import { Container } from '../../../style/layouts';
import colors from '../../../utils/colors';
import { Chronometer } from './chronometer';
import { Keyboard, SafeAreaView } from 'react-native';
import { Button } from '../../../style/button';

const IconWrapper = styled.View`
  position: absolute;
  left: 10px;
  justify-content: center;
  align-items: center;
`;

const CloseIconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 30px;
  background-color: #00000040;
`;

const ControlWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

const Text = styled.Text`
  color: ${(props) => props.color ?? colors.yellow_patito};
  font-size: ${(props) => props.size ?? 24}px;
  font-weight: bold;
`;

const WorkstationCardWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 90%;
  overflow: hidden;
`;

const WorkstationCard = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 2px 0;
  background-color: ${colors.royal_blue_light};
  border-radius: 8px;
`;

const BottomSheetView = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.yellow_patito};
`;

const BottomSheetContentView = styled.View`
  flex: 1;
  margin: 0 10%;
`;

const BottomSheetHeaderView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: 64px;
  padding: 10px;
  background-color: ${colors.yellow};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const FinishExercise = styled(Button)`
  background-color: ${colors.royal_blue};
`;

const workstationTypeArray = ['Cardio', 'Strength'];

function CardioQuestions() {
  const [calories, setCalories] = useState('');
  return (
    <>
      <Text color={colors.red}>¿Cuantas calorias marca la maquina?</Text>
      <Input
        style={{ backgroundColor: colors.yellow_patito }}
        inputContainerStyle={{ borderBottomColor: colors.royal_blue }}
        value={calories}
        onChangeText={(e) => {
          setCalories(e);
        }}
        keyboardType="decimal-pad"
      />
      <FinishExercise
        disabled={calories === ''}
        style={
          calories === '' && {
            backgroundColor: colors.gray,
          }
        }
        onPress={() => {
          console.log('ey ey ey aaaaaaqui rich');
        }}>
        <Text color={calories === '' ? colors.dark_gray : colors.white}>
          Enviar
        </Text>
      </FinishExercise>
    </>
  );
}

function StrengthQuestions() {
  return <Text color={colors.red}>Strenght xd</Text>;
}

function renderHeader(onClose) {
  return (
    <BottomSheetHeaderView>
      <CloseIconWrapper>
        <Icon
          type="material-community"
          name="close"
          size={34}
          onPress={() => {
            onClose(0);
          }}
        />
      </CloseIconWrapper>
    </BottomSheetHeaderView>
  );
}

function renderContent(workstation) {
  const { workstationCategory, workstationType } = workstation;
  return (
    <BottomSheetView>
      <BottomSheetContentView>
        <Text
          color={colors.royal_blue}
          size={34}
          style={{ fontWeight: 'bold' }}>
          ¿Ya terminaste con {workstationCategory.name}?
        </Text>

        {workstationType.name === workstationTypeArray[0] ? (
          <CardioQuestions />
        ) : (
          <StrengthQuestions />
        )}
      </BottomSheetContentView>
    </BottomSheetView>
  );
}

export function WorkoutManager() {
  const {
    state: { token },
  } = useContext(AuthContext);
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);

  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);
  const { params } = useRoute();
  const { data, isFetching, isFetched } = useQuery(
    `get-routine-with-${params.routineId}`,
    async () => {
      return await getRoutineById(token, params.routineId);
    },
  );
  const workstationCategories = useMemo(() => {
    if (!data) {
      return undefined;
    }
    const workstation = [...data.workstation];
    return workstation.splice(index).map((e) => {
      return e.workstationCategory;
    });
  }, [data, index]);

  const onCloseModal = useCallback(() => {
    bottomSheetRef.current.snapTo(1);
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    const fullSize = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShowing(true);
    });
    const normalSize = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShowing(false);
    });
    return () => {
      Keyboard.removeSubscription(fullSize);
      Keyboard.removeSubscription(normalSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <SafeAreaView />
      <Text size={36}>{data?.name}</Text>
      <WorkstationCardWrapper>
        {isFetching !== true && workstationCategories ? (
          workstationCategories.map(({ name }, workstationIndex) => {
            return (
              <WorkstationCard key={name} active={workstationIndex === 0}>
                {workstationIndex === 0 && (
                  <IconWrapper>
                    <Icon
                      type="material-community"
                      name="play"
                      color={colors.yellow}
                    />
                  </IconWrapper>
                )}
                <Text>{name}</Text>
                {workstationIndex === 0 && (
                  <ControlWrapper
                    onPress={() => {
                      bottomSheetRef.current.snapTo(0);
                    }}>
                    <Text color={colors.white} size={16}>
                      Terminar
                    </Text>
                  </ControlWrapper>
                )}
              </WorkstationCard>
            );
          })
        ) : (
          <Loader color={colors.yellow_patito} />
        )}
      </WorkstationCardWrapper>
      <Chronometer />
      {isFetched && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['85%', 0]}
          initialSnap={1}
          renderContent={() => renderContent(data.workstation[index])}
          renderHeader={() => renderHeader(onCloseModal)}
          enabledHeaderGestureInteraction={true}
          springConfig={{ toss: 20, damping: 30 }}
        />
      )}
    </Container>
  );
}
