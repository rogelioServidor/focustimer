import React, {useState} from 'react';
import {View, Text, StyleSheet, Vibration, Platform} from 'react-native';
import {RoundButton} from '../components/RoundButton';
import {Countdown} from '../components/Countdown';
import {Progressbar} from '../components/Progressbar';
import {useKeepAwake} from 'expo-keep-awake';
import {colors} from '../utils/colors';
import {sizes} from '../utils/sizes';

const DEFAULT_TIME = 20;

export const Timer = ({focus, clearSubject, cancelSubject}) =>{
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onTimerEnd = () =>{
    setMinutes(DEFAULT_TIME);
    setIsStarted(false);
    setProgress(1);
    vibrate();
    clearSubject();
  }

  const vibrate = () =>{
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=>Vibration.vibrate, 1000);
      setTimeout(()=>clearInterval(interval), 10000);
    }else{
      Vibration.vibrate(10000);
    }
  }

  const changeTime = (time) =>{
    setMinutes(time);
    setIsStarted(false);
    setProgress(1);
  }
  return(
    <View style={styles.container}>
      <Countdown isStarted={isStarted} minutes={minutes} progress={setProgress} onTimerEnd={onTimerEnd}/>
      <View style={styles.taskContainer}>
        <Text style={styles.title}>Focus on:</Text>
        <Text style={styles.task}>{focus}</Text>
      </View>
      <View>
        <Progressbar progress={progress}/>
      </View>
      <View style={styles.roundButtonsContainer}>
        <RoundButton title='10' size={75} onPress={()=>{
          changeTime(10);
        }}/>
        <RoundButton title='15' size={75} onPress={()=>{
          changeTime(15);
        }}/>
        <RoundButton title='20' size={75} onPress={()=>{
          changeTime(20);
        }}/>
      </View>
      <View style={styles.startContainer}>
        {!isStarted ? (
          <RoundButton title='Start' size={sizes.xxl} onPress={()=>{
            setIsStarted(true);
          }}/>
        ):(
          <RoundButton title='Pause' size={sizes.xxl} onPress={()=>{
            setIsStarted(false);
          }}/>
        )}
      </View>
      <View style={styles.cancelSubject}>
        <RoundButton title='-' size={sizes.xl + 10} onPress={()=>{
            cancelSubject();
          }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between',
    padding: sizes.md,
  },
  taskContainer:{
    alignItems: 'center',
  },
  title:{
    color: colors.white,
    fontSize: sizes.md,
  },
  task:{
    color: colors.white,
    fontSize: sizes.md,
    fontWeight: 'bold',
  },
  roundButtonsContainer:{
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  startContainer:{
    marginTop: sizes.lg,
    alignItems: 'center',
  },
  cancelSubject:{
    paddingLeft: sizes.lg,
    marginBottom: sizes.md
  }
});