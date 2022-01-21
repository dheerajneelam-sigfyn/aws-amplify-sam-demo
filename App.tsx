import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Amplify, { API } from "aws-amplify";

export default function App() {
  const apiName = "api6cc57f2f";
  const path = "/hello";
  const myInit = {
    headers: {},
  };
  Amplify.configure({
    API: {
      endpoints: [
        {
          name: "api6cc57f2f",
          endpoint:
            "https://a1ktimx0vg.execute-api.ap-south-1.amazonaws.com/staging",
        },
      ],
    },
  });
  const [clicked, setClicked] = useState(0);
  const [apiMessage, setApiMessage]: any = useState();
  const [showResult, setShowResult] = useState(false);
  const getApiMessage = async () => {
    API.get(apiName, path, myInit)
      .then((response: any) => {
        console.log(response);
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
        <Button onPress={() => setClicked(0)} title="Reset" color="#841584" />
      </View>
      <View style={{ margin: 10 }}>
        {showResult && <Text>Just a change : {apiMessage}</Text>}
      </View>
      <View style={{ margin: 10 }}>
        <Button
          onPress={() => getApiMessage()}
          title="Fetch Message"
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
