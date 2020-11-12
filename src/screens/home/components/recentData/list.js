/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../../../utils/colors';

const data = [
  { id: 0, text: 'Hola' },
  { id: 1, text: 'Que tal' },
  { id: 2, text: 'Que tal que pex' },
];

const { width } = Dimensions.get('screen');

const cardH = 450 * 0.9;
const cardW = width * 0.8;

const Wrapper = styled.SafeAreaView`
  width: 100%;
  height: 450px;
  margin-bottom: 20px;
`;

export function ResumeList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactiveAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const setActiveSlide = useCallback((newIndex) => {
    setActiveIndex(newIndex);
    reactiveAnimated.setValue(newIndex);
  }, []);

  return (
    <FlingGestureHandler
      key="UP"
      direction={Directions.UP}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          if (activeIndex === data.length - 1) {
            return; /* setActiveIndex(0); */
          }
          setActiveSlide(activeIndex + 1);
        }
      }}>
      <FlingGestureHandler
        key="DOWN"
        direction={Directions.DOWN}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            if (activeIndex === 0) {
              return; /* setActiveIndex(data.length - 1); */
            }
            setActiveSlide(activeIndex - 1);
          }
        }}>
        <Wrapper>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            contentContainerStyle={style.cell}
            scrollEnabled={false}
            CellRendererComponent={({
              index,
              item,
              children,
              style,
              ...props
            }) => {
              const newStyle = [
                style,
                {
                  zIndex: data.length - 20,
                  left: -cardW / 2,
                  top: -cardH / 2,
                },
              ];
              return (
                <View index={index} {...props} style={newStyle}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateY = animatedValue.interpolate({
                inputRange,
                outputRange: [-30, 0, 30],
              });
              const opacity = animatedValue.interpolate({
                inputRange,
                outputRange: [1 - 1 / 3, 1, 0],
              });
              const scale = animatedValue.interpolate({
                inputRange,
                outputRange: [0.9, 1, 1.2],
              });
              return (
                <Animated.View
                  style={[
                    style.card,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      position: 'absolute',
                      opacity,

                      transform: [{ translateY }, { scale }],
                    },
                  ]}
                  index={index}>
                  <Text>{item.text}</Text>
                </Animated.View>
              );
            }}
          />
        </Wrapper>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const style = StyleSheet.create({
  card: {
    width: cardW,
    height: cardH,
    backgroundColor: colors.yellow_patito,
    borderRadius: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
