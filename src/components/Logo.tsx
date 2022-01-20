import React from 'react';

import brainLogoSrc from '../assets/images/brain-logo.png';
import brainLogoWhiteSrc from '../assets/images/brain-logo-white.png';

interface ILogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  white?: boolean;
  width?: number;
  height?: number;
}

const Logo: React.FC<ILogoProps> = ({
  white,
  width = 120,
  height = 44,
  ...props
}) => (
  <img
    src={white ? brainLogoWhiteSrc : brainLogoSrc}
    alt="Brain by Nexus"
    width={width}
    height={height}
    {...props}
  />
);

export default Logo;
