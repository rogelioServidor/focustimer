import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';

export const RoundButton = ({
  size = 50,
  ...props
}) =>{
  return(
    <TouchableOpacity style={styles(size).container} onPress={props.onPress}>
      <Text style={styles(size).title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = (size) => StyleSheet.create({
  container:{
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: size/2,
  },
  title:{
    color: colors.white,
    fontSize: size/4,
  }
});