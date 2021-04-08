import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, { cancelAnimation, Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const CIRCLE_RADIUS = 100;
const CIRCLE_BORDER_WITH = 2;
const ADDITIONAL_RADIUS = 6;

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFF',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: ((CIRCLE_RADIUS + ADDITIONAL_RADIUS) * 2) + (ADDITIONAL_RADIUS * 2) - (CIRCLE_BORDER_WITH * 2),
        width: '100%',
    },
    circle: {
        position: 'absolute',
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: CIRCLE_BORDER_WITH,
        borderColor: '#F00'
    }
});

const LoadingText = () => {
    const [counter, setCounter] = useState(1);
    const MAX_DOTS = 3;

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCounter((counter % MAX_DOTS) + 1);
        }, 750);
        return () => clearInterval(intervalID);
    }, [counter]);

    const dots = '.'.repeat(counter);
    const spaces = ' '.repeat(MAX_DOTS - counter);

    return (
        <View style={{
            flexDirection: 'row',
            marginTop: 12,
        }}>
            <Text>Loading</Text>
            <Text>{dots + spaces}</Text>
        </View>
    );
};

interface CircleProps {
    borderColor: string,
    additionalRadius?: number,
    rotationOffset?: number,
    rotation?: Animated.SharedValue<number>,
}

const Circle: React.FC<CircleProps> = (props) => {
    const additionalRadius = props.additionalRadius ? props.additionalRadius : 0;
    const radius = CIRCLE_RADIUS + additionalRadius;
    const additionalOffset = props.additionalRadius ? CIRCLE_BORDER_WITH : 0;
    const degreeOffset = props.rotationOffset ? props.rotationOffset : 0;

    const animatedStyle = useAnimatedStyle(() => {
        const rotationDegree = interpolate(
            props.rotation ? props.rotation.value : 0,
            [0, 1],
            [0 + degreeOffset, (2 * Math.PI) + degreeOffset],
        );

        return {
            transform: [
                { rotate: rotationDegree },
                { translateX: -additionalRadius + additionalOffset },
            ]
        };
    });

    return (
        <Animated.View style={[
            styles.circle,
            {
                height: radius * 2,
                width: radius * 2,
                borderRadius: radius,
                borderColor: props.borderColor
            },
            animatedStyle
        ]}></Animated.View>
    );
};


const CircleAnimation = () => {
    const rotation = useSharedValue(0);

    const startAnimation = () => {
        rotation.value = 0;
        rotation.value = withRepeat(
            withTiming(1, // toValue: 1
                { duration: 1500, easing: Easing.linear }
            ),
            -1, // inifinite
            false); // do not reverse
    };

    useEffect(() => {
        startAnimation();
        return () => {
            cancelAnimation(rotation);
        };
    }, []);

    return (
        <View style={styles.circleContainer}>
            <Circle borderColor={'rgb(50, 150, 110)'} />
            <Circle borderColor={'rgb(50, 150, 200)'} additionalRadius={ADDITIONAL_RADIUS} rotation={rotation} />
            <Circle borderColor={'rgb(220, 0, 90)'} additionalRadius={ADDITIONAL_RADIUS} rotation={rotation} rotationOffset={60} />
        </View>
    );
};

const LoadingAnimationScreen = ({ navigation }) => {

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            navigation.navigate('StartScreen');
        }, 5000);

        return () => clearTimeout(timeoutID);
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <CircleAnimation />
            <LoadingText />
        </SafeAreaView>
    );
}

export default LoadingAnimationScreen;