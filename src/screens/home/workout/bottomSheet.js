import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import styled from 'styled-components/native';
import { Loader } from '../../../components/loader';
import { Button } from '../../../style/button';
import colors from '../../../utils/colors';
import { ResponsiveSize } from '../../../utils/helpers';

const CloseIconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 30px;
  background-color: #00000040;
`;

const Text = styled.Text`
  align-self: ${(props) => props.alignSelf ?? 'auto'};
  color: ${(props) => props.color ?? colors.yellow_patito};
  text-align: center;
  font-size: ${(props) =>
    props.size ? ResponsiveSize(props.size) : ResponsiveSize(20)}px;
  font-family: 'Oswald-Bold';
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
  background-color: ${colors.yellow_patito};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const FinishExercise = styled(Button)`
  background-color: ${colors.royal_blue};
`;

const FlatList = styled.FlatList`
  flex: 1;
  width: 100%;
`;

const ListItem = styled.TouchableOpacity`
  align-self: center;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80px;
  margin: 30px 0;
  border-radius: 10px;
  background-color: ${colors.royal_blue};
`;

const workstationTypeArray = ['Cardio', 'Strength'];

function CardioQuestions({ callback }) {
  const [calories, setCalories] = useState('');
  return (
    <>
      <Text color={colors.red} alignSelf="flex-start">
        ¿Cuantas calorias marca la maquina?
      </Text>
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
          try {
            const caloriesNum = parseFloat(calories);
            if (caloriesNum < 0) {
              throw Error();
            }
            callback({ calories });
          } catch (e) {
            showMessage({
              message: 'Las calorias solo pueden ser positivas',
              type: 'danger',
            });
          }
        }}>
        <Text color={calories === '' ? colors.dark_gray : colors.white}>
          Enviar
        </Text>
      </FinishExercise>
    </>
  );
}

function StrengthQuestions({ callback }) {
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  return (
    <>
      <Text color={colors.royal_blue} alignSelf="flex-start">
        ¿Cuantos sets realizaste?
      </Text>
      <Input
        style={{ backgroundColor: colors.yellow_patito }}
        inputContainerStyle={{ borderBottomColor: colors.royal_blue }}
        value={sets}
        onChangeText={(e) => {
          setSets(e);
        }}
        keyboardType="decimal-pad"
      />
      <Text color={colors.royal_blue} alignSelf="flex-start">
        ¿Cuantas repeticiones hiciste?
      </Text>
      <Input
        style={{ backgroundColor: colors.yellow_patito }}
        inputContainerStyle={{ borderBottomColor: colors.royal_blue }}
        value={reps}
        onChangeText={(e) => {
          setReps(e);
        }}
        keyboardType="decimal-pad"
      />
      <FinishExercise
        disabled={sets === ''}
        style={
          sets === '' && {
            backgroundColor: colors.gray,
          }
        }
        onPress={() => {
          try {
            const setsNum = parseInt(sets, 10);
            if (setsNum < 0) {
              throw Error();
            }
            const repsNum = parseInt(reps, 10);
            if (repsNum < 0) {
              throw Error();
            }
            callback({ repetition: repsNum, sets: setsNum });
          } catch (e) {
            showMessage({
              message: 'Los datos solo pueden ser numeros enteros',
              type: 'danger',
            });
          }
        }}>
        <Text color={sets === '' ? colors.dark_gray : colors.white}>
          Enviar
        </Text>
      </FinishExercise>
    </>
  );
}

export function Header({ onClose, loading }) {
  return (
    <BottomSheetHeaderView>
      {loading && <Loader color={colors.royal_blue} style={styles.loader} />}
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

export function Content({ workstation, time, callback }) {
  const { workstationType } = workstation;
  return (
    <BottomSheetView>
      <BottomSheetContentView>
        <Text color={colors.royal_blue} size={28}>
          ¿Ya terminaste con {workstation.name}?
        </Text>

        <Text color={colors.royal_blue} size={28} style={styles.mb}>
          Tu tiempo: {time}
        </Text>
        {workstationType.name === workstationTypeArray[0] ? (
          <CardioQuestions callback={callback} />
        ) : (
          <StrengthQuestions callback={callback} />
        )}
      </BottomSheetContentView>
    </BottomSheetView>
  );
}

export function WorkstationSelection({
  workstation,
  availableWorkstations,
  onClick,
  loading,
}) {
  const { name } = workstation;
  return (
    <BottomSheetView>
      <Text color={colors.royal_blue} size={26}>
        Selecciona tu {name}
      </Text>
      {loading ? (
        <Loader color={colors.royal_blue} />
      ) : (
        <FlatList
          data={availableWorkstations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const { id } = item;
            return (
              <ListItem
                onPress={() => {
                  onClick(id);
                }}>
                <Text color={colors.white}>{item.code}</Text>
              </ListItem>
            );
          }}
        />
      )}
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  mb: {
    marginBottom: 10,
  },
  loader: { position: 'absolute', top: 10, left: 10 },
});
