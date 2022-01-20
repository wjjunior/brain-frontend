import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import InternalError from '../../components/Errors/InternalError';
import PersonalInfoComponent from '../../components/Account/PersonalInfo';
import { Option } from '../../components/Select';
import { selectors, actions } from '../../modules/account';
import { editAccount } from '../../modules/account/actions';
import { Accounts } from '../../modules/account/types';
import { getUserIdFromSession } from '../../utils/auth';
import { debounce } from '../../utils/functional';
import { ROUTE_ACCOUNT_HOME } from '../../modules/account/constants';
import { displayToast } from '../../modules/shared/actions';

type AccountFormFields = {
  name?: string;
  lastName?: string;
  document?: string;
  documentType?: string;
  language?: string;
  country?: string;
  timezone?: string;
  phone?: string;
  email?: string;
};

const PersonalInfoContainer: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getIntlOptions = useCallback(
    function (prefix: string): Option[] {
      return Object.keys(intl.messages)
        .filter((key) => key.includes(prefix))
        .map((key) => ({
          key: key.replace(prefix, ''),
          label: intl.formatMessage({ id: key }),
        }))
        .sort((a, b) => (b.label > a.label ? -1 : a.label > b.label ? 1 : 0));
    },
    [intl]
  );

  const languageOptions = useMemo(() => getIntlOptions('account.languages.'), [
    getIntlOptions,
  ]);
  const countryOptions = useMemo(() => getIntlOptions('account.countries.'), [
    getIntlOptions,
  ]);
  const timezoneOptions = useMemo(() => getIntlOptions('account.timezones.'), [
    getIntlOptions,
  ]);
  const idDocumentTypeOptions = useMemo(
    () => getIntlOptions('common.documents.'),
    [getIntlOptions]
  );

  const [idDocumentType, setDocumentIdType] = useState<Option[]>([]);
  const [language, setLanguage] = useState<Option[]>([languageOptions[0]]);
  const [country, setCountry] = useState<Option[]>([countryOptions[0]]);
  const [timezone, setTimezone] = useState<Option[]>([timezoneOptions[0]]);
  const [fields, setFields] = useState<AccountFormFields>({
    name: undefined,
    lastName: undefined,
    document: undefined,
    documentType: undefined,
    language: undefined,
    country: undefined,
    timezone: undefined,
    phone: undefined,
    email: undefined,
  });

  const focusedAccount = useSelector(selectors.focusedAccount);
  const isAccountLoading = useSelector(selectors.isFocusedAccountLoading);
  const didAccountsError = useSelector(selectors.didAccountsError);
  const accountId = getUserIdFromSession();

  useEffect(() => {
    if (
      !focusedAccount &&
      !isAccountLoading &&
      !didAccountsError &&
      accountId
    ) {
      dispatch(actions.loadAccount(accountId));
    }
  }, [dispatch, focusedAccount, isAccountLoading, didAccountsError, accountId]);

  useEffect(() => {
    if (focusedAccount) {
      if (focusedAccount.documentType) {
        setDocumentIdType(
          idDocumentTypeOptions.filter(
            (option) => option.key === focusedAccount.documentType
          )
        );
      }

      if (focusedAccount.language) {
        setLanguage(
          languageOptions.filter(
            (option) => option.key === focusedAccount.language
          )
        );
      }

      if (focusedAccount.country) {
        setCountry(
          countryOptions.filter(
            (option) => option.key === focusedAccount.country
          )
        );
      }

      if (focusedAccount.timezone) {
        setTimezone(
          timezoneOptions.filter(
            (option) => option.key === focusedAccount.timezone
          )
        );
      }

      setFields({ ...focusedAccount });
    }
  }, [
    intl,
    focusedAccount,
    countryOptions,
    idDocumentTypeOptions,
    languageOptions,
    timezoneOptions,
  ]);

  if (isAccountLoading || !focusedAccount) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  if (!isAccountLoading && didAccountsError) {
    return <InternalError />;
  }

  const onInputChange = (fieldName: keyof AccountFormFields, value: any) =>
    setFields((currentFields) => ({ ...currentFields, [fieldName]: value }));

  const onSubmit = () =>
    debounce((accountRecord: Accounts.AccountRecord) => {
      const completeAccountRecord = {
        ...accountRecord,
        documentType: idDocumentType[0].key,
        language: language[0].key,
        country: country[0].key,
        timezone: timezone[0].key,
      };

      if (Object.values(completeAccountRecord).some((value) => !value)) {
        return dispatch(
          displayToast({
            id: 'invalid-personal-info',
            kind: 'warning',
            titleKey: 'common.uhh',
            subtitleKey: 'account.invalidPersonalInfo',
            timeout: 5e3,
          })
        );
      }

      dispatch(
        editAccount(accountId, completeAccountRecord, function onFinish() {
          navigate(ROUTE_ACCOUNT_HOME);
        })
      );
    }, 500)(fields);

  return (
    <PersonalInfoComponent
      {...{
        languageOptions,
        countryOptions,
        timezoneOptions,
        idDocumentTypeOptions,
        selectedIdDocumentType: idDocumentType,
        selectedLanguage: languageOptions,
        selectedCountry: countryOptions,
        selectedTimezone: timezoneOptions,
        onLanguageSelect: setLanguage,
        onCountrySelect: setCountry,
        onTimezoneSelect: setTimezone,
        onIdDocumentTypeSelect: setDocumentIdType,
        account: focusedAccount,
        onSubmit: onSubmit,
        onInputChange: onInputChange,
      }}
    />
  );
};

export default PersonalInfoContainer;
