import styled from 'styled-components';

export interface IFlexProps {
  justify?: string;
  align?: string;
  direction?: string;
  wrap?: string;
  flex?: string;
}

const Flex = styled.div<IFlexProps>`
  display: flex;
  justify-content: ${(props) => props.justify || 'normal'};
  align-items: ${(props) => props.align || 'normal'};
  flex-direction: ${(props) => props.direction || 'row'};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  flex: ${(props) => props.flex || '0 1 auto'};
`;

export default Flex;
