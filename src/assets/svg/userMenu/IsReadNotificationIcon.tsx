import * as React from 'react';
import Svg, {Rect, Path, Mask, G} from 'react-native-svg';

function IsReadNotificationIcon(props: any) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={24} height={24} rx={3} fill={props.fill} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 7.5c3.758 0 5.862 4.1 5.962 4.3.05.1.05.3 0 .4-.1.2-2.204 4.3-5.962 4.3-3.537 0-5.61-3.632-5.924-4.184l-.038-.066a.692.692 0 010-.45c.1-.2 2.204-4.3 5.962-4.3zM7.04 12c.5.8 2.254 3.5 4.96 3.5s4.46-2.7 4.96-3.5c-.5-.8-2.254-3.5-4.96-3.5S7.49 11.2 7.04 12zM12 10c-1.102 0-2.004.9-2.004 2s.902 2 2.004 2c1.102 0 2.004-.9 2.004-2s-.902-2-2.004-2zm-1.002 2c0 .55.45 1 1.002 1 .551 0 1.002-.45 1.002-1s-.45-1-1.002-1c-.551 0-1.002.45-1.002 1z"
        fill="#fff"
      />
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={6}
        y={7}
        width={12}
        height={10}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7.5c3.758 0 5.862 4.1 5.962 4.3.05.1.05.3 0 .4-.1.2-2.204 4.3-5.962 4.3-3.537 0-5.61-3.632-5.924-4.184l-.038-.066a.692.692 0 010-.45c.1-.2 2.204-4.3 5.962-4.3zM7.04 12c.5.8 2.254 3.5 4.96 3.5s4.46-2.7 4.96-3.5c-.5-.8-2.254-3.5-4.96-3.5S7.49 11.2 7.04 12zM12 10c-1.102 0-2.004.9-2.004 2s.902 2 2.004 2c1.102 0 2.004-.9 2.004-2s-.902-2-2.004-2zm-1.002 2c0 .55.45 1 1.002 1 .551 0 1.002-.45 1.002-1s-.45-1-1.002-1c-.551 0-1.002.45-1.002 1z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path fill="#fff" d="M6 6H18V18H6z" />
      </G>
    </Svg>
  );
}

export default IsReadNotificationIcon;
