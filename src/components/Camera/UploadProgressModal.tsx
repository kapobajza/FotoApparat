import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { GoogleService } from '../../services';

import { ModalComponentPropsType } from '../../ComponentLibrary/Modal';
import { ProgressBar } from '../Progress';
import { colors, sizes } from '../../styles';
import { Text } from '../../ComponentLibrary/Text';
import { useMountEffect } from '../../ComponentLibrary/hooks';

const CONTAINER_WIDTH = sizes.windowSize.width - 50;
const CONTAINER_PADDING_H = 10;

const UploadProgressModal: React.FC<ModalComponentPropsType> = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  useMountEffect(() => {
    const unsubscribe = GoogleService.onUploadProgressSubscribe(({ current, max }) => {
      setUploadProgress((current * 100) / max);
    });

    return unsubscribe;
  });

  const { headingText } = useMemo(
    () => ({
      headingText: uploadProgress === 100 ? 'Upload finished' : 'Uploading file(s)...',
    }),
    [uploadProgress],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{headingText}</Text>
      <ScrollView>
        <View style={styles.innerContainer}>
          <ProgressBar value={uploadProgress} />
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
