import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Focus } from './src/features/Focus';
import { FocusHistory } from './src/features/FocusHistory';
import { Timer } from './src/features/Timer';
import { colors } from './src/utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES ={
  COMPLETE: 1,
  CANCELLED: 2,
}

export default function App() {
  const [focus, setFocus] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistoryWithState = (subject, state) =>{
    setFocusHistory([...focusHistory, {key:String(focusHistory.length + 1), subject, state}]);
  }

  const onClear = () =>{
    setFocusHistory([]);
  }

  const saveFocusHistory = async () =>{
    try{
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    }catch(e){
      console.log(e);
    }
  }

  const loadFocusHistory = async () =>{
    try{
      const history = await AsyncStorage.getItem('focusHistory');
      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    loadFocusHistory();
  },[]);
  
  useEffect(()=>{
    saveFocusHistory();
  },[focusHistory]);
  return (
    <View style={styles.container}>
      {focus ? (
        <Timer
          focus={focus}
          clearSubject={() => {
            addFocusHistoryWithState(focus, STATUSES.COMPLETE);
            setFocus(null);
          }}
          cancelSubject={()=>{
            addFocusHistoryWithState(focus, STATUSES.CANCELLED);
            setFocus(null);
          }}
        />
      ) : (
        <>
        <Focus addSubject={setFocus} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
