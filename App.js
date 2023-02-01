import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

const ContextType = {
  translateX: Number,
  translateY: Number
}

export default function App() {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(1.5);
        translateY.value = withSpring(0.5);
      }
      // translateY.value = withSpring(0.5);
      // translateX.value = withSpring(1.5);

    }
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.cirecle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, reanimatedStyle]} />
        </PanGestureHandler>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#7286D3",
    borderRadius: CIRCLE_RADIUS / 5,
  },
  cirecle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    // backgroundColor: "#E5E0FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: "#8EA7E9"
  }
});
