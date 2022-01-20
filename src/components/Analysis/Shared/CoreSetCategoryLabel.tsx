import styled from 'styled-components';

import { H6 } from '../../Typography';
import { colors, grid } from '../../../config/theme';

const CoreSetCategoryLabel = styled(H6).attrs({ bold: true })`
  border-left: ${grid(0.5)} solid ${colors.primary.purple};
  padding-left: ${grid(1)};
  margin: ${grid(2)} 0 ${grid(1)};
`;

export default CoreSetCategoryLabel;
