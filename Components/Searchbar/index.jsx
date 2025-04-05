import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {MagnifyingGlass} from 'phosphor-react-native';
import styles from './styles';

function Searchbar({onSearch}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <MagnifyingGlass size={24} color="#828B8C" />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          onSearch?.(text);
        }}
        placeholderTextColor="#828B8C"
      />
    </View>
  );
}

export default Searchbar;
