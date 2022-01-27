import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Amplify, { API } from "aws-amplify";
import awsmobile from "./aws-exports";
export default function App() {
  const apiName = "AmplifyBackEndTestAPI";
  const path1 = "/hello";
  const path2 = "/dashboard";
  const myInit = {
    headers: {},
  };
  Amplify.configure(awsmobile);
  const [clicked, setClicked] = useState(0);
  const [apiMessage, setApiMessage]: any = useState();
  const [showResult, setShowResult] = useState(false);
  const getApiMessage = async () => {
    API.get(apiName, path1, myInit)
      .then((response: any) => {
        setApiMessage(response);
        setShowResult(true);
      })
      .catch((error: any) => {
        console.log(error.response);
      });
  };
  const getDashboardMessage = async () => {
    API.get(apiName, path2, myInit)
      .then((response: any) => {
        setApiMessage(response);
        setShowResult(true);
      })
      .catch((error: any) => {
        console.log(error.response);
      });
  };
  return (
    <View style={styles.container}>
      <Button
        onPress={() => setClicked((prevState) => prevState + 1)}
        title="Click"
        color="#841584"
      />
      <Text style={{ fontSize: 20, margin: 10 }}>{clicked}</Text>
      <View style={{ margin: 10 }}>
        <Button
          onPress={() => {
            setClicked(0);
            setShowResult(false);
          }}
          title="Reset"
          color="#841584"
        />
      </View>
      <View style={{ margin: 10 }}>
        {showResult && <Text>{apiMessage}</Text>}
      </View>
      <View style={{ margin: 10 }}>
        <Button
          onPress={() => getApiMessage()}
          title="Fetch Message"
          color="#841584"
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          onPress={() => getDashboardMessage()}
          title="Fetch Dashboard Message"
          color="#841584"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
