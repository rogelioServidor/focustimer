import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {RoundButton} from '../components/RoundButton';
import {colors} from '../utils/colors';
import {sizes} from '../utils/sizes';

const HistoryItem = ({item}) =>{
   return <Text style={styles.historyItem(item.state)}>{item.subject}</Text>
 }

export const FocusHistory = ({focusHistory, onClear}) =>{
  
  return(
    <SafeAreaView style={styles.container}>
    {!!focusHistory.length && 
      <>
      <>
      <Text style={styles.title}>Things you've focus on</Text>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{flex: 1, alignItems: 'center'}}
          data={focusHistory}
          renderItem={HistoryItem}
          keyExtractor={(item)=>{
            item.key;
          }}
        />
      </>
      <View style={styles.clearBtn}>
        <RoundButton title='Clear' size={65} onPress={()=>{
          onClear();
        }}/>
      </View>
      </>
    }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 0.5,
    alignItems: 'center',
  },
  title:{
    color: colors.white,
    fontSize: sizes.md,
    fontWeight: 'bold',
  },
  historyItem:(state)=>({
    color: state > 1 ? 'red' : 'green',
  }),
  clearBtn:{
    marginBottom: sizes.xl,
  }
});