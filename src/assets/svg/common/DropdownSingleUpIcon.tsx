import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DropdownSingleUpIcon(props: any) {
  return (
    <Svg
      width={19}
      height={18}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.211 1.578c.737-1.474 2.84-1.474 3.578 0l4.764 9.528A2 2 0 0111.763 14H2.237a2 2 0 01-1.789-2.894l4.764-9.528z"
        fill="#FF8170"
      />
    </Svg>
  );
}

export default DropdownSingleUpIcon;
