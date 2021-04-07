import React from 'react';
import {
  SafeAreaView,
    StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
    screen: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const DummyScreen = () => {
    return (
        <SafeAreaView style={styles.screen}>
            <Text>
                This is some dummy content.
            </Text>
        </SafeAreaView>
    );
}

export default DummyScreen;