import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors } from '../../styles';
import { useModal } from '../../ComponentLibrary/Modal';

interface Props {
  uploading: boolean;
}

const UploadButton: React.FC<Props> = ({ uploading }) => {
  const { openModal } = useModal();

  const onUploadButtonPress = useCallback(() => {
    openModal('UploadProgressModal');
  }, [openModal]);

  if (!uploading) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onUploadButtonPress}>
      <Icon name="upload" size={30} color={colors.white} />
      <ActivityIndicator color={colors.white} style={styles.loading} />
    </TouchableOpacity>
  );
};

export default UploadButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.blackWithTransparency(0.3),
    borderRadius: 8,
  },
  loading: {
    marginTop: 15,
  },
});
