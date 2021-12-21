import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QRCodeScreen from './src/screens/QRCode';
import ScanScreen from './src/screens/Scan';

const Stack = createStackNavigator();

const Application = () => {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName="QRCode">
                    <Stack.Screen name={'QRCode'} component={QRCodeScreen} />
                    <Stack.Screen name={'Scan'} component={ScanScreen} />
                </Stack.Navigator>
                <StatusBar style="auto" />
            </View>
        </NavigationContainer>
    );
};

export default Application;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
