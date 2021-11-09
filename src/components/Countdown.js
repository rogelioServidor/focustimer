import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {sizes} from '../utils/sizes';

const minuteToMillis = (min) => min * 1000 * 60; 
const formatTime = (time) => time<10 ? `0${time}`: time;

export const Countdown = ({
  minutes,
  isStarted,
  progress,
  onTimerEnd,
}) =>{
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);
  const min = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;

  const countdown = () =>{
    setMillis((time)=>{
      if(time === 0){
        clearInterval(interval.current);
        onTimerEnd();
        return time;
      }
      const timeLeft = millis - 1000;
      progress(timeLeft/minuteToMillis(minutes));
      return timeLeft;
    });
  }

  useEffect(()=>{
    setMillis(minuteToMillis(minutes));
  },[minutes]);

  useEffect(()=>{
    if(isStarted){
      interval.current = setInterval(countdown, 1000);
      return () => clearInterval(interval.current);
    }    
  });
  return(
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(min)}:{formatTime(sec)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: sizes.xl,
    marginBottom: sizes.xl,
    alignItems: 'center',
  },
  time:{
    color: colors.white,
    fontSize: sizes.xxl,
    fontWeight: 'bold',
  }
});