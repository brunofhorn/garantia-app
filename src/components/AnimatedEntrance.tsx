import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

type AnimatedEntranceProps = PropsWithChildren<{
  delay?: number;
  distance?: number;
  style?: ViewStyle | ViewStyle[];
}>;

export function AnimatedEntrance({ children, delay = 0, distance = 14, style }: AnimatedEntranceProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 360,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
}
