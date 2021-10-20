import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../config';
import * as actionTypes from '../constants/actionTypes';

export const getAllCharacters = () => async dispatch => {
  return axios
    .get(`https://breakingbadapi.com/api/characters`)
    .then(res => {
      console.log('Rsponcecheck', res.data);
      res.data.forEach((item, index) => {
        item.favourite = false;
      });
      dispatch({
        type: actionTypes.SET_CHARACTER_DATA,
        payload: res.data,
      });
      // return res.data;
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

export const searchCharacters = async (value) => {
  return axios
    .get(`https://breakingbadapi.com/api/characters?name=${value}`)
    .then(res => {
      console.log('Rsponcecheck', res.data);
      res.data.forEach((item, index) => {
        item.favourite = false;
      });
      return res.data;
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};
