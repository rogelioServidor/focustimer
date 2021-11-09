import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundButton} from '../components/RoundButton';
import {colors} from '../utils/colors';
import {sizes} from '../utils/sizes';

export const Focus = ({addSubject}) =>{
  const [subject, setSubject] = useState(null);
  return(
    <View style={styles.container}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.textInputContainer}>
        <TextInput style={{flex: 1, marginRight: sizes.sm}} onChange={({nativeEvent})=>{
          setSubject(nativeEvent.text);
        }}/>
        <RoundButton title='+' size={60} onPress={()=>{
          addSubject(subject);
        }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 0.5,
    justifyContent: 'center',
    padding: sizes.lg,
  },
  title:{
    color: colors.white,
    fontSize: sizes.md,
  },
  textInputContainer:{
    paddingTop: sizes.sm,
    flexDirection: 'row',
    alignItems: 'center',
  }
});