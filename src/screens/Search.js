import React, {useEffect} from 'react';
import {
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCharacters, searchCharacters} from '../actions/charecters';
import {SET_TEST} from '../constants/actionTypes';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = props => {
  const [data, setData] = React.useState([]);
  const [text, setText] = React.useState([]);

  const dispatch = useDispatch();
  const DATA = useSelector(state => state.auth.characters);

  const EditFavoutite = item => {
    let list = data;
    let pos = list.indexOf(item);
    if (pos != -1) {
      list[pos].favourite = !list[pos].favourite;
    }
    setData([...data]);
  };

  const searchData = value => {
    searchCharacters(value).then(res => {
      setData(res);
    });
  };

  const renderItem = ({item}) => (
    <View style={{flex: 0.5, marginHorizontal: 15, marginVertical: 20}}>
      <TouchableOpacity>
        <Image
          style={{height: 150, width: 150}}
          source={{
            uri: item.img,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'Roboto-Bold',
              textAlign: 'left',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
              fontFamily: 'Roboto-Light',
              textAlign: 'left',
            }}>
            {item.nickname}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            EditFavoutite(item);
          }}>
          {item.favourite ? (
            <Image source={require('../assets/images/HEART_FILLED.png')} />
          ) : (
            <Image source={require('../assets/images/HEART.png')} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#242424'}}>
      <View style={{flexDirection: 'row', backgroundColor: '#2c2c2c'}}>
        <TextInput
          style={styles.input}
          placeholder={'Search'}
          placeholderTextColor={'#FFFFFF'}
          onChangeText={text => {
            setText(text);
            searchData(text);
          }}
          value={text}
        />
        <TouchableOpacity
          style={{flex: 0.1, marginTop: 28}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon size={24} color="white" name="close-outline" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        numColumns="2"
        renderItem={renderItem}
        keyExtractor={item => item.char_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // height: 40,
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Thin',
    margin: 12,
    borderWidth: 1,
    flex: 0.9,
    backgroundColor: '#2c2c2c',
    borderColor: '#2c2c2c',
  },
});

export default Search;
