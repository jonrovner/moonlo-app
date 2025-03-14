import { Pressable, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

interface SelectorProps {
  itemName: string;
  onSearch: (query: string) => Promise<any>;
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
  items: string[]
}

const Selector: React.FC<SelectorProps> = ({ itemName, onSearch, setSelection, items }) => {

  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSearch = async (text: string) => {

    setQuery(text);
    let words = text.split(" ")
    console.log('words', words);
    if ((words.length > 1 && words[0].toLocaleLowerCase() !== "the") || words.length > 2)
      {
        const searchResults = await onSearch(text);
        console.log("results ", searchResults);
        setFilteredItems(searchResults);
    }    
  };

  const handleItemSelection = (item: string) => {
    setSelection([...items, item]);
    setQuery('');
    setFilteredItems([]);
  };

  const handleItemRemoval = (item: string) => {
    setSelection(items.filter(i => i !== item));
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.inputField}>
      <Text style={styles.inputLabel}>What are your favourite {itemName}s</Text>
       <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder={`enter a word`}
            value={query}
            onChangeText={handleSearch}
            defaultValue={query}
          />
          <Pressable onPress={()=>handleItemSelection(query)}>
              <Text style={styles.inputButton} >✓</Text>      
          </Pressable>
        </View>
      
      
        {filteredItems.length > 0 && (
         <FlatList
          data={filteredItems}
          style={styles.selectedMovieList}
          contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
          renderItem={({ item }) => (
            <Pressable style={styles.suggestion} onPress={() => handleItemSelection(item)}>
              <Text>{item}</Text>
            </Pressable>
          )}
        />
        )}
        {items.length > 0 && (
        
        <View style={styles.selectedMovieList}>
          {items.map((item) => (
            <View key={item} style={styles.selectedMovie}>
              <Text style={styles.selectedMovieText}>{item}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleItemRemoval(item)}>
                <Text> x </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    marginBlockEnd:20,

  },
  input:{
      flex:8,
      padding:10,
      margin:5,
      backgroundColor:'white',
      borderRadius:10
  },
  inputButton:{
      flex:1,
      padding:10,
      textAlign:'center',
      margin:5,
      backgroundColor:'#8a9ae0',
      borderRadius:10
  },

  inputLabel:{
      textAlign: 'left',
      fontSize:12,
      fontWeight:'800',
      marginBlock: 5
  },
  
  inputField:{
    width: '90%',
    marginTop: 10,
    padding: 10,
    backgroundColor:'#8A9AE066',
    borderRadius: 10,
    paddingBlockStart: 20,
    paddingBlockEnd: 30,
  
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  suggestion: {padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
  selectedMovieList:{zIndex:0, marginBlockStart:10, display:'flex', flexDirection:'row', gap:5},
  selectedMovie:{display:'flex', flexDirection:'row', gap:5, padding:10, backgroundColor:'#ECD4E6B2', color:'black', borderRadius:10, alignItems:'center', justifyContent:'space-between'},
  selectedMovieText:{fontSize:12, fontWeight:'800', color:'black'},
  removeButton:{textAlign:'center', borderColor:'red', borderWidth:1, padding:2, borderRadius:15},
})

export default Selector;