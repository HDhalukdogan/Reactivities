import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Button} from 'react-native-paper';

const MyComponent = ({ visible, setVisible, children }) => {


    return (
        <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.containerStyle}>
                {children}
                <Button style={{ marginTop: 30 }} onPress={()=> setVisible(false)}>
                    Close
                </Button>
            </Modal>
        </Portal>
    );
};

export default MyComponent;


const styles = StyleSheet.create({
    containerStyle : { 
        backgroundColor: 'white', padding: 20 
    }
})