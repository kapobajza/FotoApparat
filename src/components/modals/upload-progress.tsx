import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { ModalComponentPropsType } from '../../custom-lib/modal/types';
import { ProgressBar } from '../progress-bar';
import { colors, sizes } from '../../styles';
import { Text } from '../text';

const CONTAINER_WIDTH = sizes.windowSize.width - 50;
const CONTAINER_PADDING_H = 10;

const UploadProgressModal: React.FC<ModalComponentPropsType> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Uploading file(s)...</Text>
      <ScrollView>
        <View style={styles.innerContainer}>
          <ProgressBar value={120} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadProgressModal;

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: colors.white,
    width: CONTAINER_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: CONTAINER_PADDING_H,
    borderRadius: 8,
  },
  innerContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
