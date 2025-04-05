import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadToB2} from '../../Services/backblaze';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import CustomSelect from '../../Components/CustomSelect';
import useGetAllCategories from '../../hooks/useGetAllCategories';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createProduct} from '../../Services/Product';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  category: yup.string().required('Category is required'),
  stock: yup.number().required('Stock quantity is required'),
  size: yup.string().required('Size is required'),
  brand: yup.string().required('Brand is required'),
});
function CreateProduct() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [tags, setTags] = useState([]);
  const {categories} = useGetAllCategories();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      size: '',
      brand: '',
      discount: '0',
      tags: '',
    },
    resolver: yupResolver(schema),
  });

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaTypes: 'photo',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        setSelectedImage(null);
        setImageUrl(null);
        setImageError(false);
        return;
      }

      const image = result.assets[0];
      setSelectedImage(image);
      setImageUrl(image.uri);
      setImageError(false);

      await uploadImage(image);
    } catch (error) {
      console.error('Image picker error:', error);
      setImageUploadError(true);
    }
  };

  const uploadImage = async image => {
    try {
      setIsSubmitting(true);
      setImageUploading(true);
      setImageUploadError(false);

      const file = {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        size: image.fileSize || 0,
      };

      const uploadResult = await uploadToB2(file);
      if (uploadResult.success) {
        setValue('image', uploadResult.fileUrl);
        setImageUrl(uploadResult.fileUrl);
        setImageUploadError(false);
      } else {
        setImageUploadError(true);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setImageUploadError(true);
    } finally {
      setIsSubmitting(false);
      setImageUploading(false);
      reset();
    }
  };

  const onSubmit = async data => {
    try {
      if (!imageUrl) {
        Alert.alert('Error', 'Please upload a product image');
        return;
      }

      setIsSubmitting(true);

      const productData = {
        ...data,
        image: imageUrl,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        discount: parseFloat(data.discount || 0),
        tags,
      };
      console.log('Product data:', productData);
      const response = await createProduct(productData);
      if (response.success) {
        Alert.alert('Success', 'Product created successfully');
      } else {
        Alert.alert('Error', 'Failed to create product');
      }
    } catch (error) {
      console.error('Product creation error:', error);
      Alert.alert('Error', 'Failed to create product');
    } finally {
      setIsSubmitting(false);
      //   reset();
    }
  };

  const handleAddTag = value => {
    if (value.trim() && !tags.includes(value.trim())) {
      setTags([...tags, value.trim()]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <>
                <Image
                  source={{uri: imageUrl}}
                  style={styles.image}
                  resizeMode="cover"
                  onError={error => {
                    console.error(
                      'Image error:',
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
                      onPress={pickImage}
                      style={styles.retryButton}>
                      <Text style={styles.retryText}>Retry Upload</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.changeImageButton}>
                  <Text style={styles.changeImageText}>Change Image</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                style={[styles.uploadButton, styles.image]}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </TouchableOpacity>
            )}
          </View>

          <Controller
            control={control}
            name="name"
            rules={{required: 'Product name is required'}}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            name="description"
            rules={{required: 'Description is required'}}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
                placeholder="Product Description"
                value={value}
                onChangeText={onChange}
                multiline
              />
            )}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}

          <Controller
            control={control}
            name="price"
            rules={{required: 'Price is required'}}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          {errors.price && (
            <Text style={styles.errorText}>{errors.price.message}</Text>
          )}

          <Controller
            control={control}
            name="category"
            rules={{required: 'Category is required'}}
            render={({field: {onChange, value}}) => (
              <CustomSelect
                items={categories?.map(category => ({
                  id: category._id,
                  label: category.name,
                }))}
                value={value}
                containerStyle={{marginBottom: 10}}
                onChange={onChange}
                placeholder="Select a category"
                dropdownStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                }}
              />
            )}
          />
          {errors.category && (
            <Text style={styles.errorText}>{errors.category.message}</Text>
          )}

          <Controller
            control={control}
            name="stock"
            rules={{required: 'Stock quantity is required'}}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Stock Quantity"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          {errors.stock && (
            <Text style={styles.errorText}>{errors.stock.message}</Text>
          )}

          <Controller
            control={control}
            name="size"
            rules={{required: 'Size is required'}}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Size"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.size && (
            <Text style={styles.errorText}>{errors.size.message}</Text>
          )}

          <Controller
            control={control}
            name="brand"
            rules={{required: 'Brand is required'}}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Brand"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.brand && (
            <Text style={styles.errorText}>{errors.brand.message}</Text>
          )}

          <Controller
            control={control}
            name="discount"
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Discount (optional)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="tags"
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Add tags (press space to add)"
                  value={value}
                  onChangeText={onChange}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === ' ') {
                      handleAddTag(value);
                      onChange('');
                    }
                  }}
                />
                <View style={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text>{tag}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newTags = [...tags];
                          newTags.splice(index, 1);
                          setTags(newTags);
                        }}
                        style={styles.deleteTag}>
                        <Icon name="close" size={16} color="black" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </>
            )}
          />

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && {opacity: 0.7}]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Create Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateProduct;
