import axios from "axios";
import { useState } from "react";
import Toast from 'react-native-root-toast';
import { useSelector } from "react-redux";
import { deviceLanguage } from "../constants/constants";
import LottieView from "lottie-react-native";
import { View } from "react-native";



const WebClient = () => {
  const [loading, setLoading] = useState(false);
  const { user, language } = useSelector(state => state.user)

  const defaultConfig = {
    baseURL: "https://estheticallv2-api.ranna.com.tr",
    headers: {
      'Content-Type': 'application/json',
      "LanguageId": language ? language?.type : deviceLanguage == "tr" ? 1 : 2
    },
  };

  const axiosInstance = axios.create(defaultConfig);


  axiosInstance.interceptors.request.use(
    async function (config) {
      setLoading(true)

      config.headers.Authorization = `Bearer ${user?.token}`;

      return config;
    },

    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );


  axiosInstance.interceptors.response.use(
    async function (response) {
      setLoading(false);
      return response;
    },

    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );


  const Post = async (path, data, success = false, error = false) => {
    try {
      const res = await axiosInstance.post(path, data);

      if (success) {
        toast(res.data.message);
      } else if (error) {
        toast(res.data.message);
      }

      return res;
    } catch (err) {
      if (error) {
        toast(err);
      }
      throw err;
    }
  };



  return { loading, Post };

};

export default WebClient;



export const toast = (message, delay = 0) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: delay,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });
};



