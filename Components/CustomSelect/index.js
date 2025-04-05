import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const CustomSelect = ({
  items = [],
  value,
  onChange,
  placeholder = 'Select an option',
  containerStyle = {},
  selectStyle = {},
  itemStyle = {},
  selectedItemStyle = {},
  textStyle = {},
  selectedTextStyle = {},
  placeholderStyle = {},
  dropdownStyle = {},
  arrowIconStyle = {},
  arrowColor = '#000',
  arrowSize = 20,
  arrowPosition = 'right',
  error,
  errorStyle = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.item,
        itemStyle,
        value === item._id && {
          ...styles.selectedItem,
          ...selectedItemStyle,
        },
      ]}
      onPress={() => {
        onChange(item?.id);
        setIsOpen(false);
      }}>
      <Text
        style={[
          styles.itemText,
          textStyle,
          value === item.id && selectedTextStyle,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const selectedItem = items.find(item => item.id === value);
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.select, selectStyle]}
        onPress={() => setIsOpen(!isOpen)}>
        <Text
          style={[
            styles.selectText,
            textStyle,
            !selectedItem && styles.placeholder,
            !selectedItem && placeholderStyle,
          ]}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <View style={[styles.arrow, {[arrowPosition]: 10}, arrowIconStyle]}>
          <Icon
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={arrowSize}
            color={arrowColor}
          />
        </View>
      </TouchableOpacity>

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}>
          <View
            style={[
              styles.dropdown,
              dropdownStyle,
              {
                top: 0,
                position: 'relative',
                marginTop: 0,
              },
            ]}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={styles.list}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomSelect;
