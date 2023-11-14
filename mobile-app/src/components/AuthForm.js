import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const AuthForm = ({ submit }) => {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
        email:'bob@test.com',
        password:'Pa$$w0rd'
    },
  });

  const onSubmit = (data) => {
    submit(data);
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            style={styles.input}
            placeholder="E-Mail"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            style={styles.input}
            placeholder="Password"
          />
        )}
      />
      <Button title="Submit" color="#4CAF50" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    padding: 10,
    marginBottom: 20,
    width: '70%',
    borderRadius: 8,
  },
});

export default AuthForm;
