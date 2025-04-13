import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InfoTab = ({accessibilityInfo}) => {
  const {baseInfo, options} = accessibilityInfo;
  return (
    <View style={styles.container}>
      <Text>{baseInfo.description}</Text>
      <View>
        <Text style={styles.title}>휠체어 입구</Text>
        <Text style={styles.content}>
          {options.wheelchairAccessibleEntrance ? '있음' : '없음'}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>장애인 주차장</Text>
        <Text style={styles.content}>
          {options.wheelchairAccessibleParking ? '있음' : '없음'}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>휠체어 가능 자리</Text>
        <Text style={styles.content}>
          {options.wheelchairAccessibleSeating ? '있음' : '없음'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: 'lightgrey',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    color: '#555',
  },
});

export default InfoTab;
