import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../Card';
import Flex from '../Flex';
import { H6 } from '../Typography';
import { OutlineButton } from '../Button';
import { grid } from '../../config/theme';
import TextField from '../TextField';
import Separator from '../Separator';

import UpdatePasswordContainer from '../../containers/Account/UpdatePassword';
import SelectField from '../SelectField';
import { Option } from '../Select';

type Account = {
  id: string;
  name: string;
  lastName: string;
  document: string;
  documentType: string;
  language: string;
  country: string;
  timezone: string;
  userName: string;
  phone: string;
  email: string;
  company: string;
  created: string;
  updated: string;
};

type AccountFormFieldNames =
  | 'name'
  | 'lastName'
  | 'document'
  | 'documentType'
  | 'language'
  | 'country'
  | 'timezone'
  | 'phone'
  | 'email';

interface IPersonalInfoComponentProps {
  onIdDocumentTypeSelect: (options: Option[]) => void;
  onLanguageSelect: (options: Option[]) => void;
  onCountrySelect: (options: Option[]) => void;
  onTimezoneSelect: (options: Option[]) => void;
  idDocumentTypeOptions: Option[];
  languageOptions: Option[];
  countryOptions: Option[];
  timezoneOptions: Option[];
  selectedIdDocumentType: Option[];
  selectedLanguage: Option[];
  selectedCountry: Option[];
  selectedTimezone: Option[];
  account: Account;
  onSubmit: () => void;
  onInputChange: (fieldName: AccountFormFieldNames, value: any) => void;
}

const PersonalInfoComponent: React.FC<IPersonalInfoComponentProps> = ({
  idDocumentTypeOptions,
  languageOptions,
  countryOptions,
  timezoneOptions,
  selectedIdDocumentType,
  selectedLanguage,
  selectedCountry,
  selectedTimezone,
  onIdDocumentTypeSelect,
  onLanguageSelect,
  onCountrySelect,
  onTimezoneSelect,
  account,
  onSubmit,
  onInputChange,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <Flex direction="column">
          <H6>{intl.formatMessage({ id: 'account.personalInfo' })}</H6>
        </Flex>
        <div>
          <OutlineButton size="small" onClick={onSubmit}>
            {intl.formatMessage({ id: 'account.savePersonalInfo' })}
          </OutlineButton>
        </div>
      </Flex>
      <Flex style={{ marginBottom: grid(2) }}>
        <TextField
          required
          id="first-name"
          autoComplete="given-name"
          labelText={intl.formatMessage({ id: 'account.firstNameLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.firstNamePlaceholder',
          })}
          flex="1"
          style={{ marginRight: grid(4) }}
          defaultValue={account.name}
          onChange={(e) => onInputChange('name', e.target.value)}
        />
        <TextField
          required
          id="last-name"
          autoComplete="family-name"
          labelText={intl.formatMessage({ id: 'account.lastNameLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.lastNamePlaceholder',
          })}
          flex="1"
          defaultValue={account.lastName}
          onChange={(e) => onInputChange('lastName', e.target.value)}
        />
      </Flex>
      <Flex style={{ marginBottom: grid(2) }}>
        <TextField
          required
          id="id-document-number"
          labelText={intl.formatMessage({
            id: 'account.idDocumentNumberLabel',
          })}
          placeholder={intl.formatMessage({
            id: 'account.idDocumentNumberPlaceholder',
          })}
          flex="1"
          style={{ marginRight: grid(4) }}
          defaultValue={account.document}
          onChange={(e) => onInputChange('document', e.target.value)}
        />
        <SelectField
          required
          id="id-document-type"
          options={idDocumentTypeOptions}
          selectedOptions={selectedIdDocumentType}
          onChange={(option: Option[]) => onIdDocumentTypeSelect(option)}
          labelText={intl.formatMessage({ id: 'account.idDocumentTypeLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.idDocumentTypePlaceholder',
          })}
          flex="1"
        />
      </Flex>
      <Flex style={{ marginBottom: grid(4) }}>
        <TextField
          required
          id="phone-number"
          type="tel"
          autoComplete="tel-national"
          labelText={intl.formatMessage({ id: 'account.phoneNumberLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.phoneNumberPlaceholder',
          })}
          flex="1"
          style={{ marginRight: grid(4) }}
          defaultValue={account.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
        />
        <TextField
          id="email"
          type="email"
          readOnly
          autoComplete="email"
          labelText={intl.formatMessage({ id: 'account.emailLabel' })}
          placeholder={intl.formatMessage({ id: 'account.emailPlaceholder' })}
          flex="1"
          defaultValue={account.email}
          onChange={(e) => onInputChange('email', e.target.value)}
        />
      </Flex>
      <UpdatePasswordContainer />
      <Separator margin="4 0 3" />
      <Flex style={{ marginBottom: grid(2) }}>
        <SelectField
          required
          id="language"
          options={languageOptions}
          selectedOptions={selectedLanguage}
          onChange={onLanguageSelect}
          labelText={intl.formatMessage({ id: 'account.languageLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.languagePlaceholder',
          })}
          flex="1"
          style={{ marginRight: grid(4) }}
        />
        <SelectField
          required
          id="country"
          options={countryOptions}
          selectedOptions={selectedCountry}
          onChange={onCountrySelect}
          labelText={intl.formatMessage({ id: 'account.countryLabel' })}
          placeholder={intl.formatMessage({ id: 'account.countryPlaceholder' })}
          flex="1"
          style={{ marginRight: grid(4) }}
        />
        <SelectField
          required
          id="timezone"
          options={timezoneOptions}
          selectedOptions={selectedTimezone}
          onChange={onTimezoneSelect}
          labelText={intl.formatMessage({ id: 'account.timezoneLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.timezonePlaceholder',
          })}
          flex="1"
        />
      </Flex>
    </Card>
  );
};

export default PersonalInfoComponent;
