import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from './Loading.js';
import * as Location from "expo-location";

export default class extends React.Component {
  getLocation = async() =>{
    const location = await Location.getCurrentPositionAsync(options);
    console.log(location)
  }
  componentDidMount(){//render 되고 난 후 실행
    this.getLocation();
  }
  render(){
    return <Loading />;
  }
} 
