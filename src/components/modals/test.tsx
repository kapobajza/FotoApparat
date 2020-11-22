import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { ModalComponentPropsType } from '../../custom-lib/modal/types';

const TestModal: React.FC<ModalComponentPropsType> = ({
  modal: { closeModal },
}) => {
  return (
    <View style={styles.container}>
      <Text>This is a test modal</Text>
      <TouchableOpacity onPress={() => closeModal()}>
        <Text>Close me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
});
