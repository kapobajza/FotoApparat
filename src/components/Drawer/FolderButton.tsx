import React, { useState, useCallback } from 'react';
import { Linking } from 'react-native';

import { GoogleService } from '../../services';

import { config } from '../../config';
import { DrawerButton } from '../Button';
import { useFlashMessage } from '../../ComponentLibrary/FlashMessage';

const FolderButton = () => {
  const [loading, setLoading] = useState(false);
  const { showError } = useFlashMessage();

  const onGoToFolderPress = useCallback(async () => {
    try {
      setLoading(true);
      let folder = await GoogleService.getFolderByName(config.GOOGLE_DRIVE_FOLDER_NAME);

      if (!folder) {
        folder = await GoogleService.createDriveFolder(config.GOOGLE_DRIVE_FOLDER_NAME);
      }

      await Linking.openURL(`https://drive.google.com/drive/folders/${folder?.id}`);
    } catch (err) {
      console.log('err', err);
      showError(err);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  return (
    <DrawerButton
      title="Go to drive folder"
      iconName="folder"
      onPress={onGoToFolderPress}
      loading={loading}
    />
  );
};

export default FolderButton;
