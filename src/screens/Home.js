import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actionTypes from '../constants/actionTypes';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = props => {
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.auth.characters);
  const [data, setData] = React.useState(DATA);

  useEffect(() => {
    setData(DATA);
  }, []);

  const EditFavoutite = item => {
    let list = data;
    let pos = list.indexOf(item);
    if (pos != -1) {
      list[pos].favourite = !list[pos].favourite;
    }
    setData([...data]);
    dispatch({
      type: actionTypes.SET_CHARACTER_DATA,
      payload: data,
    });
  };

  const renderItem = ({item}) => (
    <View style={{flex: 0.5, marginHorizontal: 15, marginVertical: 20}}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.push('Detail', item);
        }}>
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
      <StatusBar backgroundColor="#242424" barStyle="light-content" />
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            color: '#FFFFFF',
            flex: 0.8,
            marginLeft: 15,
          }}>
          The Breaking Bad
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Search');
          }}
          style={{flex: 0.1}}>
          <Icon size={24} color="white" name="search-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Favourite');
          }}
          style={{flex: 0.1}}>
          <Image source={require('../assets/images/HEART_FILLED.png')} />
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

export default Home;
