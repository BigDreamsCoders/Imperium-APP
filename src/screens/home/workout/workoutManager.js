import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon } from 'react-native-elements';
import { Loader } from '../../../components/loader';
import { AuthContext } from '../../../context/auth';
import { completeRoutine, getRoutineById } from '../../../api/routine';
import { Container } from '../../../style/layouts';
import colors from '../../../utils/colors';
import { Chronometer } from './chronometer';
import { Keyboard, SafeAreaView } from 'react-native';
import { Button } from '../../../style/button';
import { TimeWrapper } from '../../../wrapper/Time';
import { TimeContext } from '../../../context/time';
import { Header, WorkstationSelection, Content } from './bottomSheet';
import {
  getAvailableWorkstationByCategory,
  useWorkstation,
} from '../../../api/workstation';
import { showMessage } from 'react-native-flash-message';

const Text = styled.Text`
  color: ${(props) => props.color ?? colors.yellow_patito};
  font-size: ${(props) => props.size ?? 24}px;
  font-weight: bold;
`;

const IconWrapper = styled.View`
  position: absolute;
  left: 10px;
  justify-content: center;
  align-items: center;
`;

const ControlWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

const WorkstationCardWrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  width: 90%;
  overflow: hidden;
  margin: 10% 0 0;
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

function WorkoutManagerWrapper() {
  const {
    state: {
      token,
      user: { id: userId },
    },
  } = useContext(AuthContext);
  const { time } = useContext(TimeContext);
  const bottomSheetRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [shouldStopChronometer, setShouldStopChronometer] = useState(false);
  const [shouldRestartChronometer, setShouldStartChronometer] = useState(false);
  const [hasSelectWorkstation, setHasSelectWorkstation] = useState(false);
  const [routineData, setRoutineData] = useState([]);
  const [workstationId, setWorkstationId] = useState(null);

  const { params } = useRoute();
  const { goBack } = useNavigation();

  const { data, isFetching, isFetched } = useQuery(
    `get-routine-with-${params.routineId}`,
    async () => {
      return await getRoutineById(token, params.routineId);
    },
  );

  const {
    data: availableWorkstation,
    refetch: refetchAvailableWorkstation,
    isFetching: isFetchingAvailableWorkstation,
  } = useQuery(
    'get-workstation-available',
    useCallback(async () => {
      const { workstation } = data;
      const { id } = workstation[index];
      return await getAvailableWorkstationByCategory(token, id);
    }, [index, data]),
    { enabled: false },
  );

  const [
    completeRoutineMutation,
    { isLoading: completeLoading, error },
  ] = useMutation(completeRoutine, {
    onSuccess: () => {
      setHasSelectWorkstation(true);
      onCloseModal();
      goBack();
      showMessage({
        message: 'Realizaste tu rutina con exito',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Ocurrio un error guardando tu rutina',
        type: 'danger',
      });
    },
  });
  console.log(error);
  const [useWorkstationMutation, { isLoading }] = useMutation(useWorkstation, {
    onSuccess: () => {
      onCloseModal();
    },
    onError: () => {
      showMessage({
        message: 'Ocurrio un error usando la maquina',
        type: 'danger',
      });
      refetchAvailableWorkstation();
    },
  });

  const workstationCategories = useMemo(() => {
    if (!data) {
      return undefined;
    }
    const workstation = [...data.workstation];
    return workstation.splice(index);
  }, [data, index]);

  const openModal = useCallback(() => {
    bottomSheetRef.current.snapTo(0);
  }, []);

  const onCloseModal = useCallback(() => {
    bottomSheetRef.current.snapTo(1);
    Keyboard.dismiss();
    setShouldStopChronometer(false);
  }, []);

  const saveOneWorkout = useCallback(
    (calorificData) => {
      setShouldStartChronometer(true);
      setHasSelectWorkstation(false);
      setRoutineData([
        ...routineData,
        { ...calorificData, time, workstation: workstationId },
      ]);
      const newIndex = index + 1;
      if (newIndex < data.workstation.length) {
        setIndex(newIndex);
        onCloseModal();
      } else {
        completeRoutineMutation({
          token,
          data: { data: [...routineData], routine: params.routineId },
        });
      }
    },
    [data, time, workstationId, routineData, params.routineId],
  );

  const onSelectWorkstation = useCallback((id) => {
    useWorkstationMutation({ id, userId, token, actionId: 1 });
    setWorkstationId(id);
    onCloseModal();
    setHasSelectWorkstation(true);
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
                      setShouldStopChronometer(true);
                    }}>
                    {hasSelectWorkstation && (
                      <Text color={colors.white} size={16}>
                        Terminar
                      </Text>
                    )}
                  </ControlWrapper>
                )}
              </WorkstationCard>
            );
          })
        ) : (
          <Loader color={colors.yellow_patito} />
        )}
      </WorkstationCardWrapper>
      <Chronometer
        shouldStop={shouldStopChronometer}
        shouldRestart={shouldRestartChronometer}
        hasSelectedWorkstation={hasSelectWorkstation}
        selectWorkstaitonCallback={() => {
          openModal();
        }}
      />
      {isFetched && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['85%', 0]}
          initialSnap={1}
          renderContent={() => {
            if (!hasSelectWorkstation) {
              return (
                <WorkstationSelection
                  token={token}
                  workstation={data.workstation[index]}
                  onClick={onSelectWorkstation}
                  availableWorkstations={availableWorkstation}
                  loading={isFetchingAvailableWorkstation}
                />
              );
            }
            return (
              <Content
                callback={saveOneWorkout}
                time={time}
                workstation={data.workstation[index]}
              />
            );
          }}
          renderHeader={() => (
            <Header
              onClose={onCloseModal}
              loading={isLoading || completeLoading}
            />
          )}
          enabledHeaderGestureInteraction={true}
          springConfig={{ toss: 20, damping: 30 }}
          onOpenStart={() => {
            setShouldStopChronometer(true);
            if (!hasSelectWorkstation) {
              refetchAvailableWorkstation();
            }
          }}
          onOpenEnd={() => {}}
          enabledContentGestureInteraction={false}
        />
      )}
    </Container>
  );
}

export function WorkoutManager() {
  return (
    <TimeWrapper>
      <WorkoutManagerWrapper />
    </TimeWrapper>
  );
}
