import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

const auth = getAuth();

const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
	const [value, setValue] = React.useState({
		email: "",
		password: "",
		error: "",
	});

	async function signIn() {
		if (value.email === "" || value.password === "") {
			setValue({
				...value,
				error: "Email and password are mandatory.",
			});
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, value.email, value.password);
		} catch (error: any) {
			setValue({
				...value,
				error: error.message,
			});
		}
	}

	return (
		<View style={styles.container}>
			<Text>Sign in</Text>

			{!!value.error && (
				<View style={styles.error}>
					<Text>{value.error}</Text>
				</View>
			)}

			<View style={styles.controls}>
				<Input
					placeholder="Email"
					containerStyle={styles.control}
					value={value.email}
					onChangeText={(text) => setValue({ ...value, email: text })}
					leftIcon={<Icon name="envelope" size={16} />}
					autoCompleteType="email"
				/>

				<Input
					placeholder="Password"
					containerStyle={styles.control}
					value={value.password}
					onChangeText={(text) =>
						setValue({ ...value, password: text })
					}
					secureTextEntry={true}
					leftIcon={<Icon name="key" size={16} />}
					autoCompleteType="password"
				/>

				<Button
					title="Sign in"
					buttonStyle={styles.control}
					onPress={signIn}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	controls: {
		flex: 1,
		width: "80%",
	},

	control: {
		marginTop: 10,
	},

	error: {
		marginTop: 10,
		padding: 10,
		color: "#fff",
		backgroundColor: "#D54826FF",
	},
});

export default SignInScreen;
