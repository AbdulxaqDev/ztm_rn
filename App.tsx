/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Platform} from 'react-native';
import Focus from './src/features/Focus';
import {colors} from './src/utils/colors';
import {Timer} from './src/features/Timer';
import {FocusHistory} from './src/features/FocusHistory';
import {SaveTask} from './src/features/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type subject = {
  task: string;
  id: number;
  date: string;
  spentTime: number;
};

const App = () => {
  const [currentSubject, setCurrentSubject] = useState<string | null>();
  const [history, setHistory] = useState<Array<subject>>([]);

  const GetTasks = async () => {
    try {
      const data: string | null = await AsyncStorage.getItem('@history');
      const history = data !== null ? await JSON.parse(data) : null;
      console.log(data);
      setHistory(history);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  useEffect(() => {
    GetTasks();
    return () => {
      SaveTask([...history]);
    };
  }, []);

  useEffect(() => {
    SaveTask([...history]);
  }, [history]);

  const date = () => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    return `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${d.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} setHistory={setHistory} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject: string, minuts: any) => {
            SaveTask([
              ...history,
              {task: subject, id: Date.now(), date: date(), spentTime: minuts},
            ]);
            setHistory([
              ...history,
              {task: subject, id: Date.now(), date: date(), spentTime: minuts},
            ]);
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});

export default App;
