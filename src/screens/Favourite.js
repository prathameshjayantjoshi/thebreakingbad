import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actionTypes from '../constants/actionTypes';
import Icon from 'react-native-vector-icons/Ionicons';

const Favourite = props => {
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.auth.characters);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    checkFavourite();
  }, []);

  const checkFavourite = () => {
    let tempData = [];
    // ########## This is done using for loop
    // for (let i = 0; i < DATA.length; i++) {
    //   if (DATA[i].favourite) {
    //     tempData.push(DATA[i]);
    //   }
    // }
    // ########## This is done using map function
    // DATA.map(function (item) {
    //   if (item.favourite) {
    //     tempData.push(item);
    //   }
    // });
    // ########## This is done using filter function
    DATA.filter(item => {
      if (item.favourite) {
        tempData.push(item);
      }
    });
    setData(tempData);
  };

  const EditFavoutite = item => {
    let list = DATA;
    let pos = list.indexOf(item);
    if (pos != -1) {
      list[pos].favourite = !list[pos].favourite;
    }
    setData([...data]);
    dispatch({
      type: actionTypes.SET_CHARACTER_DATA,
      payload: DATA,
    });
    checkFavourite();
  };

  const renderItem = ({item}) => (
    <View style={styles.view}>
      <Image
        style={{height: 150, width: 150}}
        source={{
          uri: item.img,
        }}
      />
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

  const emptyList = () => {
    return (
      <Text
        style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 18,
          color: '#FFFFFF',
          textAlign: 'center',
          marginTop: '50%',
        }}>
        There is nothing to show
      </Text>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#242424'}}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            color: '#18CA75',
            flex: 0.9,
            marginLeft: 15,
          }}>
          Favourites
        </Text>
        <TouchableOpacity
          style={{flex: 0.1}}
          onPress={() => {
            props.navigation.replace('Home');
          }}>
          <Icon size={24} color="white" name="close-outline" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        numColumns="2"
        renderItem={renderItem}
        keyExtractor={item => item.char_id}
        ListEmptyComponent={emptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 0.5, marginHorizontal: 15, marginVertical: 20},
});

export default Favourite;
