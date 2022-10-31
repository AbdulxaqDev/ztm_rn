import {View, Text, StyleSheet, Vibration} from 'react-native';
import React, {useState} from 'react';

import {ProgressBar} from 'react-native-paper';
// import {useKeepAwake} from 'expo-keep-awake';
import {Countdown} from '../components/Countdown';
import {RoundedButton} from '../components/RoundedButton';
import {Timing} from './Timing';
import {spacing} from '../utils/sizes';
import {colors} from '../utils/colors';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({
  focusSubject,
  onTimerEnd,
  clearSubject,
}: {
  focusSubject: string;
  onTimerEnd: Function;
  clearSubject: Function;
}) => {
  // useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progess, setProgress] = useState(1);
  const [minuts, setMinuts] = useState(10);

  const onEnd = (reset: () => void) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject, minuts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minuts}
          onProgress={setProgress}
          onEnd={onEnd}
          isPaused={!isStarted}
        />
        <View style={{paddingTop: spacing.xxl}}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar
          color={colors.progessBar}
          style={{height: spacing.sm}}
          progress={progess}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinuts} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubjectWarapper}>
        <RoundedButton title="-" size={50} onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    justifyContent: 'space-around',
    paddingTop: spacing.xxl,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  clearSubjectWarapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
});
