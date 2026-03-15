import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { LoaderColor } from "../constant/theme/color";

type Props = {
  visible?: boolean;
  message?: string;
};

const Loader: React.FC<Props> = ({ visible = true, message }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator testID="loader" size="large" color={LoaderColor} />
      {message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
});