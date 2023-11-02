import * as ImagePicker from "expo-image-picker";

import "react-native-gesture-handler";

export const selectImage = function (useLibrary) {
  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.1,
  };

  if (useLibrary) {
    return new Promise(function (resolve, reject) {
      ImagePicker.launchImageLibraryAsync(options)
        .then(function (response) {
          if (
            !response.canceled &&
            response.assets &&
            response.assets.length > 0
          ) {
            resolve(response);
          } else {
            reject("Image selection cancelled");
          }
        })
        .then(function () {
          handleCloseModal();
        })
        .catch(function (error) {
          reject(error);
        });
    });
  } else {
    return new Promise(function (resolve, reject) {
      ImagePicker.requestCameraPermissionsAsync()
        .then(function () {
          return ImagePicker.launchCameraAsync(options);
        })
        .then(function (response) {
          if (
            !response.canceled &&
            response.assets &&
            response.assets.length > 0
          ) {
            resolve(response);
          } else {
            reject("Camera operation cancelled");
          }
        })
        .then(function () {
          handleCloseModal();
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
};
