import axios from "axios";
import { useState } from "react";
import Toast from 'react-native-root-toast';
import { useSelector } from "react-redux";



const WebClient = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.user)


  const defaultConfig = {
    baseURL: "https://estheticallv2-api.ranna.com.tr",
    headers: {
      'Content-Type': 'application/json',
      "LanguageId": 1
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

      if (res.data.code === "100" && success) {
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



export const toast = (message) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
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



