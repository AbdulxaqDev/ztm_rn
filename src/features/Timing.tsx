import {View, Text, StyleSheet} from 'react-native';
import {RoundedButton} from '../components/RoundedButton';
import React from 'react';
import {spacing} from '../utils/sizes';

export const Timing = ({onChangeTime}: {onChangeTime: Function}) => {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: -150}}>
        <RoundedButton size={75} title="10" onPress={() => onChangeTime(10)} />
      </View>
      <View>
        <RoundedButton size={75} title="15" onPress={() => onChangeTime(15)} />
      </View>
      <View>
        <RoundedButton size={75} title="20" onPress={() => onChangeTime(20)} />
      </View>
      <View style={{marginBottom: -150}}>
        <RoundedButton size={75} title="25" onPress={() => onChangeTime(25)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
});
