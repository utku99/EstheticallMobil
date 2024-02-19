import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DropdownSingleDownIcon(props: any) {
  return (
    <Svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.54 16.759c-.907 1.655-3.173 1.655-4.08 0L.32 3.724C-.589 2.07.545 0 2.36 0h14.28c1.814 0 2.948 2.069 2.04 3.724L11.54 16.76z"
        fill="#FF8170"
      />
    </Svg>
  );
}

export default DropdownSingleDownIcon;
