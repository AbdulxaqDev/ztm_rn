import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {fontSizes, spacing} from '../utils/sizes';
import {RoundedButton} from '../components/RoundedButton';
// import {DeleteTask} from './Storage';

type subject = {
  task: string;
  id: number;
  date: string;
  spentTime: number;
};

export const FocusHistory = ({
  history,
  setHistory,
}: {
  history: Array<subject>;
  setHistory: Function;
}) => {
  if (!history || !history.length)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You haven't focused on anything yet.</Text>
      </View>
    );

  const date = () => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    return `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${d.getFullYear()}`;
  };

  const DeleteTask = (taskID: number) => {
    setHistory([...history.filter(task => task.id !== taskID)]);
  };

  const renderItem = ({item}: {item: subject}) => (
    <View style={styles.itemWrapper}>
      <Text
        style={{
          fontSize: fontSizes.md,
          borderBottomColor: '#cecece50',
          borderBottomWidth: 1,
          width: '90%',
          paddingBottom: spacing.sm - 3,
          marginBottom: spacing.sm - 3,
        }}>
        {item.date === date() ? 'Today' : item.date}
      </Text>
      <Text style={styles.item}>
        You focused on <Text style={{fontWeight: '700'}}>{item.task}</Text>
      </Text>
      <Text style={styles.item}>
        Spent <Text style={{fontWeight: '700'}}>{item.spentTime}</Text> minuts
      </Text>
      <RoundedButton
        onPress={() => DeleteTask(item.id)}
        style={styles.deleteBtn}
        title="Del"
        size={30}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we focused on:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  itemWrapper: {
    padding: spacing.md,
    fontSize: fontSizes.md,
    backgroundColor: '#cecece20',
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    paddingBottom: spacing.sm,
  },
  deleteBtn: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
  },
});

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);
