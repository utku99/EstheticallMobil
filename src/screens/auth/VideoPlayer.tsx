import {useNavigation} from '@react-navigation/native';
import {useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';

const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  const navigation = useNavigation();
  return (
    <Video
      // Can be a URL or a local file.
      source={require('../../assets/video/video.mp4')}
      // Store reference
      ref={videoRef}
      // Callback when remote video is buffering
      onBuffer={() => ''}
      onEnd={() => navigation.navigate('welcome')}
      onError={() => ''}
      resizeMode="cover"
      className="flex-1"
    />
  );
};

export default VideoPlayer;
