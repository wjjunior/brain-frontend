import React from 'react';
import { Popup, PopupProps } from 'semantic-ui-react';

import { grid } from '../config/theme';
import { ReactComponent as HelpIcon } from '../assets/icons/help.svg';

const Tooltip: React.FC<PopupProps> = (props) => (
  <Popup {...props} trigger={<HelpIcon style={{ marginLeft: grid(1) }} />} />
);

export default Tooltip;
