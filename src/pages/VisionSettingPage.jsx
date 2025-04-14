import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useVision} from '../contexts/visionContext';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';
const visionOptions = ['비장애', '저시력', '전맹'];

const VisionSettingPage = () => {
  const {theme} = useTheme();

  const {visionMode, updateVisionMode} = useVision(); //context로 관리
  const [selected, setSelected] = useState(visionMode);
  const navigation = useNavigation();

  const saveSelection = async () => {
    if (selected) {
      await updateVisionMode(selected);
      navigation.navigate('Search');
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {visionOptions.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            {borderColor: theme.colors.border},
            selected === option && {
              backgroundColor: '#000',
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => setSelected(option)}>
          <Text
            style={[
              styles.optionText,
              selected === option && styles.selectedText,
              {color: theme.colors.text},
            ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.button, {color: theme.colors.background}]}
        onPress={saveSelection}
        disabled={!selected}>
        <Text style={[styles.buttonText, {color: theme.colors.text}]}>
          저장하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisionSettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#000',
    borderColor: '#737373',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#222',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
