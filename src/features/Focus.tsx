import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {RoundedButton} from '../components/RoundedButton';
import {spacing} from '../utils/sizes';

export default function Focus({addSubject}: {addSubject: any}) {
  const [subject, setSubject] = useState<string>();
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={val => setSubject(val)}
          label="What would you like to focus on?"
          autoCorrect={false}
        />
        <View style={styles.button}>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
