import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {colors} from '../utils/colors';
import {sizes} from '../utils/sizes';

export const Progressbar = ({progress}) =>{
  return(
    <View>
      <ProgressBar
      progress={progress}
      color={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});