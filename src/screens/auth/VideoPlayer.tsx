import {useNavigation} from '@react-navigation/native';
import {useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';

const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  const navigation = useNavigation();
  return (
    <Video
      source={require('../../assets/video/video.mp4')}
      ref={videoRef}
      onBuffer={() => ''}
      onEnd={() => navigation.navigate('welcome')}
      onError={() => ''}
      resizeMode="cover"
      className="flex-1"
    />
  );
};

export default VideoPlayer;
