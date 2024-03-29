import React, { } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';

const Profile = ({ profile, loading, error, navigation }) => {
    const theme = useTheme();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        Alert.alert('Error', error, [{ text: 'OK', onPress: () => navigation.goBack() }]);
        return null;
    }

    return (
        <View style={[styles.container, {backgroundColor:theme.colors.surfaceVariant}]}>
            <Text>{profile.displayName}</Text>
            <Image style={styles.profileImage} source={{ uri: profile.image }} />
            <Text>{profile.bio || 'No bio available'}</Text>
            <Text>Followers: {profile.followersCount}</Text>
            <Text>Following: {profile.followingCount}</Text>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
    },
});