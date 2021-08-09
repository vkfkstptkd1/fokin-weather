import React from 'react';
import { Alert } from "react-native";
import Loading from './Loading.js';
import * as Location from "expo-location";
import axios from "axios";//fetch

const WEATHER_API_KEY ="765ed73d4d92f1e27e000c6371f2f459";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async(latitude,longitude) => {
    const { weatherdata } = await axios.get(
      `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
    );//axios를 이용해 openAPI 가져옴
    console.log( weatherdata );
  };
  getLocation = async() =>{
    try { 
      await Location.requestForegroundPermissionsAsync();//client에게 위치 정보 따와도 되는지 허가요청
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();//expo의 현재 위치 가져와주는 기능
      this.getWeather(latitude,longitude)
      this.setState({ isLoading: false });
    } catch {
      Alert.alert("Can't find you.", "We can't recommend you anything.");
    }
  }
  componentDidMount(){//render 되고 난 후 실행
    this.getLocation();
  }
  render(){
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
} 
