import React from 'react';
import { Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { IStackScreenProps } from '../library/IStackScreenProps';
import { IQRCodePayload } from '../library/IQRCodePayload';

const QRCodeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation } = props;
    const payload: IQRCodePayload = { name: 'Cool Person', number: '1-234-567-8900' };

    return (
        <>
            <QRCode value={JSON.stringify(payload)} />
            <Button title="Go to Scanner" onPress={() => navigation.navigate('Scan')} />
        </>
    );
};

export default QRCodeScreen;
