import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
     <View style={styles.yellowbar}></View>
     <View style={styles.bluebar}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,//flex로 구성해야 모든 앱 간 레이아웃 유동성이 좋음
    backgroundColor: '#fff'
  },
  bluebar: {
    flex: 1,
    backgroundColor: "blue"
  },
  yellowbar: {
    flex: 1,
    backgroundColor: "yellow"
  }
});
