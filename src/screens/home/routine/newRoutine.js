import React, { useContext, useState } from 'react';
import { Icon, Input } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { FAB } from 'react-native-paper';
import { SharedElement } from 'react-navigation-shared-element';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import styled from 'styled-components/native';
import { addRoutine } from '../../../api/routine';
import { getWorkstationsCategory } from '../../../api/workstation';
import { Loader } from '../../../components/loader';
import { AuthContext } from '../../../context/auth';
import { Container } from '../../../style/layouts';
import colors from '../../../utils/colors';
import { WorkstationItem } from './workstationItem';

const Wrapper = styled(Container)`
  background-color: ${colors.yellow_patito};
`;

const IconCloseWrap = styled.View`
  align-self: flex-start;
  top: 10px;
  left: 10px;
  background-color: #00000030;
  border-radius: 30px;
`;

const IconDoneWrapper = styled(SharedElement)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const TextInput = styled(Input)`
  margin-top: 20px;
  color: ${colors.royal_blue};
`;

const Text = styled.Text`
  color: ${colors.royal_blue};
  font-size: 32px;
  font-weight: bold;
  margin-left: 10px;
`;

const List = styled.FlatList`
  margin-top: 20px;
`;

export function NewRoutineScreen({ navigation }) {
  const {
    state: { token },
  } = useContext(AuthContext);

  const cache = useQueryCache();

  const [workstationList, setNewWorkstationList] = useState([]);
  const [name, setName] = useState('');

  const { data, isFetching } = useQuery('workstation-category', async () => {
    const data = await getWorkstationsCategory(token);
    return data;
  });

  const [addNewRoutine] = useMutation(addRoutine, {
    onSuccess: () => {
      showMessage({
        message: 'La rutina se agrego exitosamente',
        type: 'success',
      });
      navigation.goBack();
    },
    onError: () => {
      showMessage({
        message: 'Ocurrio un error',
        type: 'danger',
      });
    },
  });

  return (
    <Wrapper>
      <IconCloseWrap>
        <Icon
          name="close"
          type="matirial-community"
          size={32}
          color={colors.royal_blue}
          onPress={() => {
            cache.invalidateQueries('workstation-category');
            navigation.goBack(); /* navigate(constants.SCREENS.ROUTINE.ROUTINES); */
          }}
        />
      </IconCloseWrap>
      <TextInput
        placeholder="Nombre de la nueva rutina"
        placeholderTextColor={colors.royal_blue_light}
        value={name}
        onChangeText={(value) => setName(value)}
        inputContainerStyle={{ borderBottomColor: colors.royal_blue }}
      />
      <Text>Selecciona que harás</Text>
      <Wrapper>
        {isFetching ? (
          <Loader color={colors.royal_blue} />
        ) : (
          <List
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const active = workstationList.some((i) => i === item.id);
              return (
                <WorkstationItem
                  item={item}
                  active={active}
                  onPress={(_active) => {
                    if (_active) {
                      setNewWorkstationList(
                        workstationList.filter(
                          (routine) => routine !== item.id,
                        ),
                      );
                    } else {
                      setNewWorkstationList([...workstationList, item.id]);
                    }
                  }}
                />
              );
            }}
          />
        )}
        <IconDoneWrapper id="fab">
          <FAB
            icon="check"
            style={{
              margin: 16,
              backgroundColor: colors.royal_blue,
            }}
            onPress={() => {
              addNewRoutine({
                token,
                body: { name, workstationCategories: workstationList },
              });
            }}
            color={colors.yellow_patito}
          />
        </IconDoneWrapper>
      </Wrapper>
    </Wrapper>
  );
}
