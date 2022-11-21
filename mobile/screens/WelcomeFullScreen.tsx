import React from "react";
import * as WebBrowser from "expo-web-browser";

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet,
} from "react-native";
import { useAuth } from "../context/AuthProvider";
import { RootStackScreenProps } from "../types";
import { env } from "../config/env";

export const LoginScreen = ({ navigation }: RootStackScreenProps<"Login">) => {
  const { signUp, signIn, currentUser, setCurrentUser } = useAuth();

  const [registerScreen, setRegisterScreen] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 53,
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Text style={{ color: "pink" }}>{error}</Text>
          <Image
            source={require("../assets/images/lock.png")}
            style={{ marginBottom: 24 }}
          />
          <Text style={[{ paddingBottom: 24 }, styles.header]}>
            {!registerScreen ? "Log In" : "Create Account"}
          </Text>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            style={[styles.textInput]}
            value={email}
            placeholder="E-mail"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
            onChangeText={(input) => setEmail(input)}
          />
          <TextInput
            style={[styles.textInput]}
            value={password}
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
            onChangeText={(input) => setPassword(input)}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity
            disabled={loading}
            style={[styles.submitButton]}
            onPress={(e) => {
              e.preventDefault();
              if (registerScreen) {
                console.log("registerScreen");
                signUp(email, password)
                  .then((r) => {
                    console.log(r);
                    setCurrentUser(r.user.email);
                  })
                  .catch((e) => {
                    setLoading(false);
                    console.log(e);
                    setError("User already exists");
                  });
              } else {
                console.log("login", env.API_URL);
                setError("");
                signIn(email, password)
                  .then((r) => {
                    console.log(r);
                    setCurrentUser(r.user.email);
                  })
                  .catch((e) => {
                    setLoading(false);
                    console.log(e);
                    setError("User doesn't exist or credentials are wrong");
                  });
              }
            }}
            accessibilityLabel="continue"
          >
            <Text
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                fontWeight: "900",
                fontSize: 16,
                lineHeight: 22,
                letterSpacing: 0.5,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
          {!registerScreen ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.h2}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  setRegisterScreen((prev) => !prev);
                  setError("");
                }}
              >
                <Text style={[styles.redirectButton]}>Create Account</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.h2}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  setRegisterScreen((prev) => !prev);
                  setError("");
                }}
              >
                <Text style={[styles.redirectButton]}>Log In</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <View style={styles.additionalTextContainer}>
            <TouchableOpacity onPress={handleHelpPress}>
              <Text style={[styles.additionalText, { marginRight: 17 }]}>
                Terms Of Use
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHelpPress}>
              <Text style={styles.additionalText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

function handleHelpPress() {
  WebBrowser.openBrowserAsync("https://github.com/litehacker");
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 48,
    width: 310,
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.9)",
    opacity: 0.7,
    fontStyle: "normal",
    fontWeight: "400",
  },
  header: {
    color: "white",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 32,
    lineHeight: 44,
  },
  submitButton: {
    justifyContent: "center",
    height: 48,
    width: 310,
    backgroundColor: "#3694EB",
    borderRadius: 8,
    marginBottom: 24,
  },
  h2: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
  },
  redirectButton: {
    textDecorationLine: "underline",
    color: "#3694EB",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
  },
  additionalTextContainer: {
    flexDirection: "row",
  },
  additionalText: {
    color: "white",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
  },
});
