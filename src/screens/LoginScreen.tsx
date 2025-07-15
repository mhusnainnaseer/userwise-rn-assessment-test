import React, { useState } from 'react';
import { Button, TextInput, View, Text, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { object, string } from 'Yup';
import { useSecureStorage } from '../hooks/useSecureStorage';

const validationSchema = object({
	email: string().email(),
	password: string().required().min(2)
});


export const MyReactNativeForm = () => {
	const [loading, setLoading] = useState(false);
	const { setToken } = useSecureStorage();

	const onSubmitForm = (values: { email: string, password: string }) => {
		const fakeToken = 'userwise_login_fake_token';
		setLoading(true);
		setTimeout(() => {
			setToken(fakeToken);
			Alert.alert('Toekn is set')
		}, 2000);
	}

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{ email: '', password: '' }}
			onSubmit={values => onSubmitForm(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View>
					<TextInput
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
						value={values.email}
					/>
					{errors.email && touched.email && <Text style={{ color: 'red' }}>
						{'Error in Email'}
					</Text>}
					<TextInput
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						value={values.password}
					/>
					{errors.password && touched.password && <Text style={{ color: 'red' }}>
						{'Error in Password'}
					</Text>}
					{loading ? <ActivityIndicator /> : <Button onPress={handleSubmit} title="Login" />}
				</View>
			)}
		</Formik>
	)
};