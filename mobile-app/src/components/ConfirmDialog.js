import { StyleSheet } from 'react-native'
import React from 'react'
import { Dialog, Portal, Text, Button } from 'react-native-paper';

const ConfirmDialog = ({ title,content, visible, setVisible, onOkClick, onCancelClick }) => {
    const hideDialog = () => setVisible(false);
    const handleOkClick = () => {
        onOkClick()
        hideDialog();
    }
    const handleCancelClick = () => {
        onCancelClick();
        hideDialog();
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{content}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleCancelClick}>Cancel</Button>
                    <Button onPress={handleOkClick}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default ConfirmDialog

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
})