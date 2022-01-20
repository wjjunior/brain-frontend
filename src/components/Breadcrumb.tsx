import React from 'react';
import styled from 'styled-components';

import Flex from './Flex';
import { H2, H7 } from './Typography';
import { ReactComponent as Divider } from '../assets/icons/divider.svg';

interface IBreadcrumbProps {}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ children }: any) => {
  return (
    <Flex align="center" wrap="wrap">
      {React.Children.map(children || null, (child, index) =>
        !child ? null : (
          <>
            <child.type
              {...child.props}
              lastItem={index === children.length - 1}
            />
            {index < children.length - 2 && <Divider />}
          </>
        )
      )}
    </Flex>
  );
};

interface IItemProps {
  text?: string;
  linkComponent?: React.FC;
  lastItem?: boolean;
}

const Item: React.FC<IItemProps> = ({ linkComponent, lastItem, text }) => {
  const Link = linkComponent;

  const PreviousItem = (
    <H7 color={Link ? 'primary.purple' : 'primary.gray'}>{text}</H7>
  );

  const ActiveItem = (
    <H2 bold color="primary.dark_blue">
      {text}
    </H2>
  );

  const baseItem = lastItem ? ActiveItem : PreviousItem;

  return (
    <ItemWrapper flex={lastItem ? '1 1 100%' : 'inherit'}>
      {Link ? <Link>{baseItem}</Link> : baseItem}
    </ItemWrapper>
  );
};

const ItemWrapper = styled(Flex).attrs({ align: 'center' })`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;

interface WithItem extends React.FC<IBreadcrumbProps> {
  Item: React.FC<IItemProps>;
}

const aux = Breadcrumb;
(aux as WithItem).Item = Item;

export default aux as WithItem;
