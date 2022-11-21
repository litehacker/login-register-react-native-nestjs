import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { useAuth } from "../context/AuthProvider";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { currentUser, setCurrentUser } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 30 }]}>
        Hello, {currentUser} 🚀
      </Text>

      <TouchableOpacity onPress={() => setCurrentUser("")}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
