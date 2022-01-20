import React from 'react';

interface IHealthImpactSubjectFormContainerProps {
  subject: string;
  formId: string;
}

const HealthImpactSubjectFormContainer: React.FC<IHealthImpactSubjectFormContainerProps> = ({
  subject,
  formId,
}) => {
  return <h1>hello from HealthImpactSubjectFormContainer</h1>;
};

export default HealthImpactSubjectFormContainer;
