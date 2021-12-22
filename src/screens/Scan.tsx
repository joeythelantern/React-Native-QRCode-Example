import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, StyleSheet } from 'react-native';
import { IStackScreenProps } from '../library/IStackScreenProps';
import { IQRCodePayload } from '../library/IQRCodePayload';

const ScanScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const [scanData, setScanData] = useState<IQRCodePayload>();
    const [permission, setPermission] = useState(true);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
            const { status, granted } = await BarCodeScanner.requestPermissionsAsync();
            console.log(`Status: ${status}, Granted: ${granted}`);

            if (status === 'granted') {
                console.log('Access granted');
                setPermission(true);
            } else {
                setPermission(false);
            }
        } catch (error) {
            console.error(error);
            setPermission(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Text>Requesting permission ...</Text>;

    if (permission) {
        return (
            <BarCodeScanner
                style={[styles.container]}
                onBarCodeScanned={({ type, data }) => {
                    try {
                        let _data = JSON.parse(data);
                        console.log('Data: ', _data);
                        console.log('type: ', type);
                        setScanData(_data);
                    } catch (error) {
                        console.error('Unable to parse string: ', error);
                    }
                }}
            >
                <Text style={styles.text}>Scan the QR code.</Text>
                {scanData && (
                    <>
                        <Text style={styles.text}>Name: {scanData.name}</Text>
                        <Text style={styles.text}>Number: {scanData.number}</Text>
                    </>
                )}
            </BarCodeScanner>
        );
    } else {
        return <Text style={styles.textError}>Permission rejected.</Text>;
    }
};

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        marginTop: 15
    },
    textError: {
        color: 'red'
    }
});
