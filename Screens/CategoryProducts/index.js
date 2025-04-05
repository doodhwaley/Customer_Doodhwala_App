import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import useGetProductsByCategory from '../../hooks/useGetProductsByCategory';
import ProductCard from '../../Components/ProductCard';

function CategoryProducts({navigation}) {
  const {id, categoryName} = useRoute().params;
  const {products, loading, error, category} = useGetProductsByCategory(id);
  const [selectedTag, setSelectedTag] = useState('all');

  const tags = [
    {name: 'All', id: 'all'},
    {name: 'Tag 1', id: 'tag1'},
    {name: 'Tag 2', id: 'tag2'},
    {name: 'Tag 3', id: 'tag3'},
    {name: 'Tag 4', id: 'tag4'},
    {name: 'Tag 5', id: 'tag5'},
    {name: 'Tag 6', id: 'tag6'},
    {name: 'Tag 7', id: 'tag7'},
    {name: 'Tag 8', id: 'tag8'},
  ];

  // Make sure products is always an array
  const safeProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  useEffect(() => {
    navigation.setOptions({
      title: categoryName || 'Category Products',
    });
  }, [categoryName, navigation]);

  // Render tag item for the horizontal FlatList
  const renderTag = ({item: tag}) => (
    <TouchableOpacity
      onPress={() => setSelectedTag(tag.id)}
      style={[
        styles.tagButton,
        {backgroundColor: tag.id === selectedTag ? '#0066cc' : 'lightgray'},
      ]}>
      <Text
        style={[
          styles.tagText,
          {color: tag.id === selectedTag ? '#fff' : '#000'},
        ]}>
        {tag.name}
      </Text>
    </TouchableOpacity>
  );

  // Render product item for the products FlatList
  const renderProduct = ({item}) => <ProductCard product={item} />;

  // Empty component for the products list
  const EmptyProductList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products found in this category</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {/* Tags horizontal list */}
          <FlatList
            data={tags}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderTag}
            style={styles.tagsList}
          />

          {/* Products grid */}
          <View style={styles.productsContainer}>
            <FlatList
              data={safeProducts}
              renderItem={renderProduct}
              keyExtractor={item => item._id || String(Math.random())}
              ListEmptyComponent={EmptyProductList}
              ItemSeparatorComponent={() => <View style={{height: 15}} />}
              contentContainerStyle={styles.productsList}
              columnWrapperStyle={{
                justifyContent: 'center',
                gap: 10,
              }}
              numColumns={2}
              initialNumToRender={4}
              key="two-column-list" // This key helps React understand this is a specific list configuration
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  tagsList: {
    padding: 10,
    maxHeight: 45,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 25,
  },
  tagText: {
    fontSize: 14,
  },
  productsContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  productsList: {
    padding: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default CategoryProducts;
