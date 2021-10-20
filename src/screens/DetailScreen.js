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
import {getAllCharacters} from '../actions/charecters';
import * as actionTypes from '../constants/actionTypes';
import Icon from 'react-native-vector-icons/Ionicons';
const DetailScreen = props => {
  const item = props.route.params;

  const dispatch = useDispatch();
  const DATA = useSelector(state => state.auth.characters);
  const [data, setData] = React.useState(DATA);
  const [otherCharacters, setOtherCharacters] = React.useState([]);
  //   const DATA = ['a', 'b'];

  useEffect(() => {
    let tempData = [];
    for (let i = 0; i < DATA.length; i++) {
      if (DATA[i].category === item.category) {
        tempData.push(DATA[i]);
      }
    }
    setOtherCharacters(tempData);
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
    <View
      style={{backgroundColor: '#2c2c2c', marginHorizontal: 4, marginTop: 10}}>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 12,
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
          padding: 5,
        }}>
        {'Season ' + item}
      </Text>
    </View>
  );

  const renderItemCharacters = ({item}) => (
    <View style={{flex: 0.5, marginHorizontal: 15, marginVertical: 20}}>
      <View>
        <Image
          style={{height: 150, width: 150}}
          source={{
            uri: item.img,
          }}
        />
      </View>
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
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#242424'}}>
      <Image
        style={{flex: 1}}
        source={{
          uri: item.img,
        }}
      />
      <Image
        style={{
          height: 130,
          width: 130,
          position: 'absolute',
          alignSelf: 'center',
          marginTop: '16%',
        }}
        source={{
          uri: item.img,
        }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'flex-start',
          top: 5,
          left: 15,
        }}
        onPress={() => {
          props.navigation.replace('Home');
        }}>
        <Icon size={24} color="white" name="arrow-back-outline" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          top: 5,
          right: 15,
        }}
        onPress={() => {
          EditFavoutite(item);
        }}>
        {item.favourite ? (
          <Image source={require('../assets/images/HEART_FILLED.png')} />
        ) : (
          <Image source={require('../assets/images/HEART.png')} />
        )}
      </TouchableOpacity>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 30,
          fontFamily: 'Roboto-Bold',
          textAlign: 'center',
        }}>
        {item?.name}
      </Text>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 12,
          fontFamily: 'Roboto-Light',
          textAlign: 'center',
        }}>
        {item?.nickname}
      </Text>
      <View style={{marginHorizontal: 15, marginTop: 20}}>
        <Text
          style={{fontFamily: 'Roboto-Medium', fontSize: 12, color: '#18CA75'}}>
          Potrayed
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Light',
              fontSize: 12,
              color: '#FFFFFF',
            }}>
            {item?.portrayed}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Roboto-Light',
                fontSize: 12,
                color: '#FFFFFF',
              }}>
              {item?.birthday}{'  '}
            </Text>
            <Icon size={13} color="white" name="gift-outline" />
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 15, marginTop: 20}}>
        <Text
          style={{fontFamily: 'Roboto-Medium', fontSize: 12, color: '#18CA75'}}>
          Occupation
        </Text>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontFamily: 'Roboto-Light',
              fontSize: 12,
              color: '#FFFFFF',
            }}>
            {item?.occupation[0]}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Light',
              fontSize: 12,
              color: '#FFFFFF',
              marginTop: 5,
            }}>
            {item?.occupation[1]}
          </Text>
        </View>
      </View>
      <View style={{marginHorizontal: 15, marginTop: 20}}>
        <Text
          style={{fontFamily: 'Roboto-Medium', fontSize: 12, color: '#18CA75'}}>
          Appeared in
        </Text>
        <FlatList
          horizontal={true}
          data={item?.appearance}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      </View>
      <View style={{marginHorizontal: 15, marginTop: 20}}>
        <Text
          style={{fontFamily: 'Roboto-Medium', fontSize: 12, color: '#18CA75'}}>
          Other Charecters
        </Text>
        <FlatList
          horizontal={true}
          data={otherCharacters}
          renderItem={renderItemCharacters}
          keyExtractor={item => item.char_id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default DetailScreen;
