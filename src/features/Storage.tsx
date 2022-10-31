import AsyncStorage from '@react-native-async-storage/async-storage';

type subject = {
  task: string;
  id: number;
  date: string;
  spentTime: number;
};

export const DeleteTask = async (taskID: string) => {
  try {
    const data: string | null = await AsyncStorage.getItem('@history');
    const history = data !== null ? await JSON.parse(data) : null;
    console.log(history);

    history.splice(
      history.find((task: any, i: number) => {
        if (task.id === taskID) return i;
      }),
    );
    SaveTask(history);
  } catch (e) {
    console.log('Error: ', e);
  }
};

export const SaveTask = async (tasks: Array<subject>) => {
  try {
    await AsyncStorage.setItem('@history', JSON.stringify(tasks));
    console.log(tasks);
  } catch (e) {
    console.log('Error: ', e);
  }
};
