import React from 'react';
import { Alert } from "react-native";
import Loading from './Loading.js';
import * as Location from "expo-location";
import axios from "axios";//fetch
import Weather from './Weather.js';

const WEATHER_API_KEY ="765ed73d4d92f1e27e000c6371f2f459";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  
  getWeather = async(latitude,longitude) => {
    const { 
      data: { 
        main: { temp },
        weather
        } 
      } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      //`https://api.openweathermap.org/data/2.5/weather?lat=37.3840749&lon=126.66334940000002&appid=765ed73d4d92f1e27e000c6371f2f459&units=metric`
      );//axios를 이용해 openAPI 가져옴
 //   console.log( data );
   
    this.setState({
       isLoading: false, 
       condition: weather[0].main,
       temp 
      });
  };
  
  getLocation = async() =>{
    try { 
      await Location.requestForegroundPermissionsAsync();//client에게 위치 정보 따와도 되는지 허가요청
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();//expo의 현재 위치 가져와주는 기능
      this.getWeather( latitude,longitude )
      //this.setState({ isLoading: false });
    } catch {
      Alert.alert("Can't find you.", "We can't Wrecommend you anything.");
    }
  }
  componentDidMount(){//render 되고 난 후 실행
    this.getLocation();
  }
  render(){
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (<Loading />) : (<Weather temp={Math.round(temp)} condition = {condition} />);
  }
} 
