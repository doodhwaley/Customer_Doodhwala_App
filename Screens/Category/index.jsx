import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import {useForm, Controller} from 'react-hook-form';
import {createCategory} from '../../Services/Category';
import {uploadToB2} from '../../Services/backblaze';
import {launchImageLibrary} from 'react-native-image-picker';

function Category() {
  const [imageUrl, setImageUrl] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      image: '',
    },
  });

  const pickAndUploadImage = async () => {
    try {
      setIsLoading(true);

      // Request permission
      const {status} = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (status !== 'granted') {
        console.error('Permission denied');
        Alert.alert(
          'Permission Denied',
          'Please enable photo library access in settings',
        );
        return {
          success: false,
          error: 'Permission to access media library was denied',
        };
      }

      // Launch image picker
      const result = await launchImageLibrary({
        mediaTypes: 'photo',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageAsset = result.assets[0];

        // Create a file object from the image asset
        const file = {
          uri: imageAsset.uri,
          type: imageAsset.type || 'image/jpeg',
          size: imageAsset.fileSize || 0,
        };

        // Simply pass the file to our generic upload function
        console.log('Uploading file:', file.uri);
        const uploadResult = await uploadToB2(file);

        if (uploadResult.success) {
          console.log('Upload successful:', uploadResult.fileUrl);
          setImageUrl(uploadResult.fileUrl);
          setAuthToken(uploadResult.authToken);
          setValue('image', uploadResult.fileUrl);

          return {
            success: true,
            fileUrl: uploadResult.fileUrl,
            fileName: uploadResult.fileName,
          };
        } else {
          console.error('Upload failed:', uploadResult.error);
          Alert.alert('Upload Failed', uploadResult.error);
          return {success: false, error: uploadResult.error};
        }
      } else {
        console.log('Image picking was cancelled or no image selected');
        return {success: false, error: 'Image picking was cancelled'};
      }
    } catch (error) {
      console.error('Error in pickAndUploadImage:', error);
      Alert.alert('Error', `Failed to upload image: ${error.message}`);
      return {success: false, error: error.message};
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async () => {
    try {
      const result = await pickAndUploadImage();
      if (result.success) {
        setImageUrl(result.fileUrl);
        setValue('image', result.fileUrl);
      }
    } catch (error) {
      console.error('Error handling image upload:', error);
      Alert.alert('Error', 'Failed to handle image upload. Please try again.');
    }
  };

  const onSubmit = async data => {
    // Validate data before submitting
    if (!data.name.trim()) {
      Alert.alert('Error', 'Category name is required');
      return;
    }

    if (!data.image && !imageUrl) {
      Alert.alert('Error', 'Please upload an image');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting category data:', data);

      const response = await createCategory(data);
      console.log('Category created successfully:', response);

      // Clear form and show success message
      setValue('name', '');
      setValue('description', '');
      setValue('image', '');
      setImageUrl('');

      Alert.alert('Success', 'Category created successfully!', [{text: 'OK'}]);
    } catch (error) {
      console.error('Error creating category:', error);

      let errorMessage = 'Failed to create category. Please try again.';
      if (error.message === 'Network Error') {
        errorMessage =
          'Unable to connect to the server. Please check your internet connection.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert('Error', errorMessage, [{text: 'OK'}]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <>
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={styles.image}
                resizeMode="cover"
                onError={error => {
                  console.error(
                    'Detailed image error:',
                    JSON.stringify(error.nativeEvent),
                  );
                  setImageError(true);
                  setIsLoading(false);
                }}
                onLoadStart={() => {
                  setIsLoading(true);
                  setImageError(false);
                }}
                onLoadEnd={() => setIsLoading(false)}
              />
              {errors.image && (
                <Text style={styles.errorText}>{errors.image.message}</Text>
              )}
              {isLoading && (
                <View style={[styles.image, styles.loadingOverlay]}>
                  <ActivityIndicator size="large" color="#007AFF" />
                </View>
              )}
              {imageError && (
                <View style={[styles.image, styles.errorOverlay]}>
                  <Text style={styles.errorText}>Failed to load image</Text>
                  <TouchableOpacity
                    onPress={handleImageUpload}
                    style={styles.retryButton}>
                    <Text style={styles.retryText}>Retry Upload</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={handleImageUpload}
                style={styles.changeImageButton}>
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={handleImageUpload}
              style={[styles.uploadButton, styles.image]}>
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
          )}
        </View>

        <Controller
          control={control}
          rules={{
            required: 'Name is required',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Category Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              // Fix: Add maxLength to prevent too long names
              maxLength={50}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={3}
              style={[styles.input, {height: 100}]}
              // Fix: Add maxLength to prevent too long descriptions
              maxLength={500}
            />
          )}
          name="description"
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Create Category</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Category;
