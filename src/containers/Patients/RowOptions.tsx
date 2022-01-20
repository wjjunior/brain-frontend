import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import Flex from '../../components/Flex';
import { H7, Link } from '../../components/Typography';
import RowMenu from '../../components/Shared/RowMenu';

import { ReactComponent as OptionsIcon } from '../../assets/icons/table-options.svg';
import { ReactComponent as ViewIcon } from '../../assets/icons/view.svg';

interface IRowOptionsProps {
  diagnosticReportUrl?: string;
}

const RowOptions: React.FC<IRowOptionsProps> = ({ diagnosticReportUrl }) => {
  const intl = useIntl();
  const currentRowOptionsRef = useRef<HTMLDivElement>(null);
  const [isRowOptionsOpen, setRowOptionsOpenState] = useState<boolean>(false);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      const ref = currentRowOptionsRef.current;
      const modalElement = document.getElementById('analysis-type-selection');
      const target = event.target as Node;

      if (
        !ref ||
        ref.contains(target) ||
        (modalElement && modalElement.contains(target))
      )
        return;

      setRowOptionsOpenState(false);
    }

    document.addEventListener('mousedown', onDocumentClick);

    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, []);

  return (
    <Flex
      ref={currentRowOptionsRef}
      onMouseLeave={() => setRowOptionsOpenState(false)}
      style={{ position: 'relative' }}
    >
      <OptionsIcon
        onClick={() => setRowOptionsOpenState((currentState) => !currentState)}
      />
      {isRowOptionsOpen && (
        <RowMenu>
          {!!diagnosticReportUrl && (
            <Link to={diagnosticReportUrl}>
              <Flex align="center" as="li">
                <ViewIcon />
                <H7>{intl.formatMessage({ id: 'common.viewFile' })}</H7>
              </Flex>
            </Link>
          )}
        </RowMenu>
      )}
    </Flex>
  );
};

export default RowOptions;
