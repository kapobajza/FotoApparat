import React, { useState } from 'react';
import { Linking } from 'react-native';

import { GoogleService } from '../../services';

import { DrawerButton } from '../button';
import { AppConfig } from '../../config';
import { useFlashMessage } from '../../custom-lib/flash-message';

const FolderButton = () => {
  const [loading, setLoading] = useState(false);
  const { showError } = useFlashMessage();

  const onGoToFolderPress = async () => {
    try {
      setLoading(true);
      let folder = await GoogleService.getFolderByName(
        AppConfig.GOOGLE_DRIVE_FOLDER_NAME,
      );

      if (!folder) {
        folder = await GoogleService.createDriveFolder(
          AppConfig.GOOGLE_DRIVE_FOLDER_NAME,
        );
      }

      await Linking.openURL(
        `https://drive.google.com/drive/folders/${folder?.id}`,
      );
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

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
