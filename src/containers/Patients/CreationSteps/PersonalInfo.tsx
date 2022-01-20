import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import PersonalInfoComponent, {
  Field,
} from '../../../components/Patients/CreationSteps/PersonalInfo';
import { Option } from '../../../components/Select';
import { selectors } from '../../../modules/patients';
import {
  clearFocusedPatient,
  createPatient,
  lookupZipcode,
  loadPatient,
  editPatient,
  updateSocialEconomicLevel,
  updateValidationText,
} from '../../../modules/patients/actions';
import {
  AGE_RANGES,
  ROUTE_PATIENTS_CREATE_CLINICAL_INFO,
  ROUTE_PATIENTS_EDIT_CLINICAL_INFO,
} from '../../../modules/patients/constants';
import { focusedPatient } from '../../../modules/patients/selectors';
import { Patients, ValidFormFieldNames } from '../../../modules/patients/types';
import { displayToast } from '../../../modules/shared/actions';
import { calculateAge, debounce } from '../../../utils/functional';
import { ValueMap } from '../../../utils/typings';

type ValidatorFn = (value: string | Option | Date | null) => string;

const requiredOptionSelection: ValidatorFn = (option) => {
  if (typeof option === 'string') return '';
  if (!option) return 'patients.personalInfo.validation.nothingSelected';
  return '';
};

const validators: ValueMap<ValidatorFn> = {
  [ValidFormFieldNames.FullName]: (value) => {
    if (typeof value === 'string') {
      if (value.length < 3)
        return 'patients.personalInfo.validation.fullNameMinLength';
      if (!value.includes(' '))
        return 'patients.personalInfo.validation.usernameSpaces';
    }

    return '';
  },
  [ValidFormFieldNames.IdDocumentType]: requiredOptionSelection,
  [ValidFormFieldNames.IdDocumentNumber]: (value) => {
    if (typeof value === 'string') {
      if (value.replace(/\D/g, '').length < 8)
        return 'patients.personalInfo.validation.minDocumentNumberLength';
    }

    return '';
  },
  [ValidFormFieldNames.BirthDate]: (value) => {
    if (typeof value === 'string') return '';
    if (value instanceof Date || value === null) {
      if (!value || isNaN(+value)) {
        return 'patients.personalInfo.validation.invalidBirthDate';
      }
    }

    return '';
  },
  [ValidFormFieldNames.Email]: (value) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof value === 'string') {
      if (!emailRegex.test(value))
        return 'patients.personalInfo.validation.invalidEmail';
    }

    return '';
  },
  [ValidFormFieldNames.PhoneNumber]: (value) => {
    const phoneNumberRegexes = [
      '^([1-9]{2}|[0]{1}[1-9]{2})?[6-9][0-9]{3}[0-9]{4}$',
      '^([1-9]{2}|[0]{1}[1-9]{2})?9[0-9]{3,4}[0-9]{4}$',
    ].map((regex) => new RegExp(regex));

    if (typeof value === 'string') {
      if (
        phoneNumberRegexes.every(
          (regex) => !regex.test(value.replace(/\D/g, ''))
        )
      )
        return 'patients.personalInfo.validation.invalidPhoneNumber';
    }

    return '';
  },
  [ValidFormFieldNames.Zipcode]: (value) => {
    const zipcodeRegex = /^\d{5}-\d{3}$/;

    if (typeof value === 'string') {
      if (!zipcodeRegex.test(value))
        return 'patients.personalInfo.validation.invalidZipcode';
    }

    return '';
  },
  [ValidFormFieldNames.Address]: (value) => {
    if (typeof value === 'string') {
      if (value.length < 3)
        return 'patients.personalInfo.validation.invalidAddress';
    }

    return '';
  },
  [ValidFormFieldNames.City]: (value) => {
    if (typeof value === 'string') {
      if (value.length < 3)
        return 'patients.personalInfo.validation.invalidCity';
    }

    return '';
  },
  [ValidFormFieldNames.Profession]: (value) => {
    if (typeof value === 'string') {
      if (value.length < 3)
        return 'patients.personalInfo.validation.invalidProfession';
    }

    return '';
  },
  [ValidFormFieldNames.Gender]: requiredOptionSelection,
  [ValidFormFieldNames.MaritalStatus]: requiredOptionSelection,
  [ValidFormFieldNames.EducationLevel]: requiredOptionSelection,
  [ValidFormFieldNames.State]: requiredOptionSelection,
  [ValidFormFieldNames.Country]: requiredOptionSelection,
};

function getInputValues(
  inputRefs: Array<React.RefObject<HTMLInputElement>>
): ValueMap<string> {
  const inputValues: ValueMap<string> = {};

  for (const inputRef of inputRefs) {
    if (inputRef.current) {
      inputValues[inputRef.current.name] = inputRef.current.value;
    }
  }

  return inputValues;
}

const PersonalInfoContainer: React.FC = () => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const idDocumentNumberRef = useRef<HTMLInputElement>(null);
  const professionRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const zipcodeRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const [
    selectedDocumentType,
    setSelectedDocumentType,
  ] = useState<Option | null>(null);
  const [
    selectedEducationLevel,
    setSelectedEducationLevel,
  ] = useState<Option | null>(null);
  const [
    selectedMaritalStatus,
    setSelectedMaritalStatus,
  ] = useState<Option | null>(null);
  const [
    selectedStateOrProvince,
    setSelectedStateOrProvince,
  ] = useState<Option | null>(null);
  const [selectedGender, setSelectedGender] = useState<Option | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [disableEdit, setDisableEdit] = useState<boolean>(false);

  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const zipcodeLookup = useSelector(selectors.latestZipcodeLookup);
  const existingPatient = useSelector(selectors.focusedPatient);
  const isFocusedPatientLoading = useSelector(
    selectors.isFocusedPatientLoading
  );
  const isZipcodeLookupLoading = useSelector(selectors.isZipcodeLookupLoading);
  const socialEconomicLevel = useSelector(selectors.socialEconomicLevel);
  const patientValidationTexts = useSelector(selectors.patientValidationTexts);
  const currentSocialEconomicLevel = useSelector(selectors.socialEconomicLevel);

  const getIntlOptions = useCallback(
    function (prefix: string) {
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

  const countryOptions = useMemo(() => getIntlOptions('common.countries.'), [
    getIntlOptions,
  ]);

  const stateOrProvinceOptions = useMemo(
    () => getIntlOptions('common.states.'),
    [getIntlOptions]
  );

  const idDocumentTypeOptions = useMemo(
    () => getIntlOptions('common.documents.'),
    [getIntlOptions]
  );

  const educationLevelOptions = useMemo(
    () => getIntlOptions('common.educationLevels.'),
    [getIntlOptions]
  );

  const maritalStatusOptions = useMemo(
    () => getIntlOptions('common.maritalStatuses.'),
    [getIntlOptions]
  );

  const genderOptions = useMemo(() => getIntlOptions('common.genders.'), [
    getIntlOptions,
  ]);

  useEffect(() => {
    // this means we're on creation, we need a hard reset
    if (!patientId && existingPatient) {
      dispatch(clearFocusedPatient());

      if (fullNameRef.current) {
        fullNameRef.current.value = '';
      }

      if (idDocumentNumberRef.current) {
        idDocumentNumberRef.current.value = '';
      }

      if (professionRef.current) {
        professionRef.current.value = '';
      }

      if (emailRef.current) {
        emailRef.current.value = '';
      }

      if (addressRef.current) {
        addressRef.current.value = '';
      }

      if (cityRef.current) {
        cityRef.current.value = '';
      }
    }
  }, [patientId, existingPatient, dispatch]);

  useEffect(() => {
    if (!patientId) return;

    setDisableEdit(true);

    if (!existingPatient) {
      if (!isFocusedPatientLoading) dispatch(loadPatient(patientId));
      return;
    }

    if (existingPatient.education) {
      const option = educationLevelOptions.find(
        (option) => option.key === existingPatient.education
      );

      if (option) {
        setSelectedEducationLevel(option);
      }
    }

    if (existingPatient.gender) {
      const option = genderOptions.find(
        (option) => option.key === `${existingPatient.gender}`
      );

      if (option) {
        setSelectedGender(option);
      }
    }

    if (existingPatient.maritalStatus) {
      const option = maritalStatusOptions.find(
        (option) => option.key === existingPatient.maritalStatus
      );

      if (option) {
        setSelectedMaritalStatus(option);
      }
    }

    if (existingPatient.documentType) {
      const option = idDocumentTypeOptions.find(
        (option) => option.key === existingPatient.documentType
      );

      if (option) {
        setSelectedDocumentType(option);
      }
    }

    if (existingPatient.country) {
      const option = countryOptions.find(
        (option) => option.key === existingPatient.country
      );

      if (option) {
        setSelectedCountry(option);
      }
    }

    if (existingPatient.state) {
      const option = stateOrProvinceOptions.find(
        (option) => option.key === existingPatient.state
      );

      if (option) {
        setSelectedStateOrProvince(option);
      }
    }

    if (existingPatient.birthdate) {
      const parsedDate = new Date(existingPatient.birthdate);
      const ageRange = getAgeRange(parsedDate);

      if (ageRange) {
        setSelectedAgeRange(ageRange);
      }

      if (+parsedDate && parsedDate < new Date()) {
        setBirthDate(parsedDate);
      }
    }

    if (existingPatient.phone) {
      if (phoneNumberRef.current) {
        phoneNumberRef.current.value = existingPatient.phone;
      }
    }

    if (existingPatient.postalCode) {
      if (zipcodeRef.current) {
        zipcodeRef.current.value = existingPatient.postalCode;
      }
    }

    if (existingPatient.economicClassification) {
      dispatch(
        updateSocialEconomicLevel(existingPatient.economicClassification)
      );
    }
  }, [
    intl,
    patientId,
    existingPatient,
    isFocusedPatientLoading,
    dispatch,
    countryOptions,
    educationLevelOptions,
    genderOptions,
    idDocumentTypeOptions,
    maritalStatusOptions,
    stateOrProvinceOptions,
  ]);

  useEffect(() => {
    if (!zipcodeLookup) return;

    setSelectedCountry(countryOptions[0]);
    setSelectedStateOrProvince(
      stateOrProvinceOptions.find(
        (state) => state.key === zipcodeLookup.state
      ) || null
    );

    dispatch(updateValidationText(ValidFormFieldNames.Country, ''));
    dispatch(updateValidationText(ValidFormFieldNames.State, ''));

    if (cityRef.current) {
      cityRef.current.value = zipcodeLookup.city;
      dispatch(updateValidationText(ValidFormFieldNames.City, ''));
    }

    if (addressRef.current) {
      addressRef.current.value = zipcodeLookup.street;
      dispatch(updateValidationText(ValidFormFieldNames.Address, ''));
    }
  }, [zipcodeLookup, countryOptions, stateOrProvinceOptions, dispatch]);

  const dispatchLookupZipcode = debounce((digits: string) => {
    dispatch(lookupZipcode(digits));
  }, 500);

  const fullNameField = {
    id: 'full-name',
    type: 'text',
    autoComplete: 'name',
    defaultValue: existingPatient ? existingPatient.name : '',
    required: true,
    ref: fullNameRef,
    onBlur: validateFromInputEvent,
    onChange: validateFromInputEvent,
    validationText: patientValidationTexts[ValidFormFieldNames.FullName],
    placeholder: intl.formatMessage({
      id: 'patients.personalInfo.fullNamePlaceholder',
    }),
    labelText: intl.formatMessage({
      id: 'patients.personalInfo.fullNameLabel',
    }),
  };

  const idDocumentTypeField = {
    id: 'id-document-type',
    selectProps: {
      required: true,
      options: idDocumentTypeOptions,
      selectedOptions: selectedDocumentType ? [selectedDocumentType] : [],
      onChange: ([option]: Option[]) => {
        setSelectedDocumentType(option);
        const validationTextId = validators[ValidFormFieldNames.IdDocumentType](
          option
        );

        const validationMessage = validationTextId
          ? intl.formatMessage({ id: validationTextId })
          : '';

        dispatch(
          updateValidationText(
            ValidFormFieldNames.IdDocumentType,
            validationMessage
          )
        );
      },
      validationText:
        patientValidationTexts[ValidFormFieldNames.IdDocumentType],
      placeholder: intl.formatMessage({
        id: 'patients.personalInfo.idDocumentTypePlaceholder',
      }),
      labelText: intl.formatMessage({
        id: 'patients.personalInfo.idDocumentTypeLabel',
      }),
    },
  };

  const idDocumentNumberField = {
    id: 'id-document-number',
    type: 'text',
    defaultValue: existingPatient ? existingPatient.document : '',
    required: true,
    mask:
      selectedDocumentType && selectedDocumentType.key === 'cpf'
        ? '999.999.999-99'
        : undefined,
    ref: idDocumentNumberRef,
    onBlur: validateFromInputEvent,
    onChange: validateFromInputEvent,
    validationText:
      patientValidationTexts[ValidFormFieldNames.IdDocumentNumber],
    placeholder: intl.formatMessage({
      id: 'patients.personalInfo.idDocumentNumberPlaceholder',
    }),
    labelText: intl.formatMessage({
      id: 'patients.personalInfo.idDocumentNumberLabel',
    }),
  };

  const educationLevelField = {
    id: 'education-level',
    selectProps: {
      options: educationLevelOptions,
      selectedOptions: selectedEducationLevel ? [selectedEducationLevel] : [],
      onChange: ([option]: Option[]) => {
        setSelectedEducationLevel(option);
        const validationTextId = validators[ValidFormFieldNames.EducationLevel](
          option
        );

        const validationMessage = validationTextId
          ? intl.formatMessage({ id: validationTextId })
          : '';

        dispatch(
          updateValidationText(
            ValidFormFieldNames.EducationLevel,
            validationMessage
          )
        );
      },
      required: true,
      validationText:
        patientValidationTexts[ValidFormFieldNames.EducationLevel],
      placeholder: intl.formatMessage({
        id: 'patients.personalInfo.educationPlaceholder',
      }),
      labelText: intl.formatMessage({
        id: 'patients.personalInfo.educationLevel',
      }),
    },
  };

  const professionField = {
    id: 'profession',
    autoComplete: 'organization-title',
    type: 'text',
    defaultValue: existingPatient ? existingPatient.occupation : '',
    required: true,
    ref: professionRef,
    onBlur: validateFromInputEvent,
    onChange: validateFromInputEvent,
    validationText: patientValidationTexts[ValidFormFieldNames.Profession],
    placeholder: intl.formatMessage({
      id: 'patients.personalInfo.professionPlaceholder',
    }),
    labelText: intl.formatMessage({
      id: 'patients.personalInfo.professionLabel',
    }),
  };

  const fields: Field[][] = [
    [
      {
        id: 'phone-number',
        type: 'tel',
        mask: '(99) 99999-9999',
        ref: phoneNumberRef,
        onBlur: validateFromInputEvent,
        onChange: validateFromInputEvent,
        validationText: patientValidationTexts[ValidFormFieldNames.PhoneNumber],
        autoComplete: 'tel-national',
        required: true,
        placeholder: intl.formatMessage({
          id: 'patients.personalInfo.phoneNumberPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.personalInfo.phoneNumberLabel',
        }),
      },
      {
        id: 'email',
        type: 'email',
        autoComplete: 'email',
        defaultValue: existingPatient ? existingPatient.email : '',
        required: true,
        ref: emailRef,
        onBlur: validateFromInputEvent,
        onChange: validateFromInputEvent,
        validationText: patientValidationTexts[ValidFormFieldNames.Email],
        placeholder: intl.formatMessage({
          id: 'patients.personalInfo.emailPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.personalInfo.emailLabel',
        }),
      },
    ],
    [
      {
        id: 'marital-status',
        selectProps: {
          options: maritalStatusOptions,
          selectedOptions: selectedMaritalStatus ? [selectedMaritalStatus] : [],
          onChange: ([option]: Option[]) => {
            setSelectedMaritalStatus(option);
            const validationTextId = validators[
              ValidFormFieldNames.MaritalStatus
            ](option);

            const validationMessage = validationTextId
              ? intl.formatMessage({ id: validationTextId })
              : '';

            dispatch(
              updateValidationText(
                ValidFormFieldNames.MaritalStatus,
                validationMessage
              )
            );
          },
          validationText:
            patientValidationTexts[ValidFormFieldNames.MaritalStatus],
          required: true,
          placeholder: intl.formatMessage({
            id: 'patients.personalInfo.maritalStatusPlaceholder',
          }),
          labelText: intl.formatMessage({
            id: 'patients.personalInfo.maritalStatusLabel',
          }),
        },
      },
      {
        id: 'gender',
        selectProps: {
          options: genderOptions,
          selectedOptions: selectedGender ? [selectedGender] : [],
          onChange: ([option]: Option[]) => {
            setSelectedGender(option);
            const validationTextId = validators[ValidFormFieldNames.Gender](
              option
            );

            const validationMessage = validationTextId
              ? intl.formatMessage({ id: validationTextId })
              : '';

            dispatch(
              updateValidationText(
                ValidFormFieldNames.Gender,
                validationMessage
              )
            );
          },
          validationText: patientValidationTexts[ValidFormFieldNames.Gender],
          required: true,
          placeholder: intl.formatMessage({
            id: 'patients.personalInfo.genderPlaceholder',
          }),
          labelText: intl.formatMessage({
            id: 'patients.personalInfo.genderLabel',
          }),
        },
      },
    ],
    [
      {
        id: 'zipcode',
        mask: '99999-999',
        type: 'text',
        ref: zipcodeRef,
        onBlur: validateFromInputEvent,
        validationText: patientValidationTexts[ValidFormFieldNames.Zipcode],
        onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
          const input = zipcodeRef.current;
          event.persist();

          validateFromInputEvent(event);

          if (!input) return;
          const digits = input.value.replace(/[^0-9]/g, '');

          if (digits.length) {
            dispatchLookupZipcode(digits);
          }
        },
        autoComplete: 'postal-code',
        required: true,
        placeholder: intl.formatMessage({
          id: 'patients.personalInfo.zipcodePlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.personalInfo.zipcodeLabel',
        }),
      },
      {
        id: 'address',
        type: 'text',
        ref: addressRef,
        onBlur: validateFromInputEvent,
        onChange: validateFromInputEvent,
        validationText: patientValidationTexts[ValidFormFieldNames.Address],
        defaultValue: existingPatient ? existingPatient.street : '',
        autoComplete: 'street-address',
        required: true,
        placeholder: intl.formatMessage({
          id: 'patients.personalInfo.addressPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.personalInfo.addressLabel',
        }),
      },
    ],
    [
      {
        id: 'city',
        type: 'text',
        ref: cityRef,
        onBlur: validateFromInputEvent,
        onChange: validateFromInputEvent,
        validationText: patientValidationTexts[ValidFormFieldNames.City],
        defaultValue: existingPatient ? existingPatient.city : '',
        autoComplete: 'address-level2',
        required: true,
        placeholder: intl.formatMessage({
          id: 'patients.personalInfo.cityPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.personalInfo.cityLabel',
        }),
      },
      {
        id: 'state-or-province',
        selectProps: {
          options: stateOrProvinceOptions,
          selectedOptions: selectedStateOrProvince
            ? [selectedStateOrProvince]
            : [],
          onChange: ([option]: Option[]) => {
            setSelectedStateOrProvince(option);
            const validationTextId = validators[ValidFormFieldNames.State](
              option
            );

            const validationMessage = validationTextId
              ? intl.formatMessage({ id: validationTextId })
              : '';

            dispatch(
              updateValidationText(ValidFormFieldNames.State, validationMessage)
            );
          },
          validationText: patientValidationTexts[ValidFormFieldNames.State],
          required: true,
          placeholder: intl.formatMessage({
            id: 'patients.personalInfo.stateOrProvincePlaceholder',
          }),
          labelText: intl.formatMessage({
            id: 'patients.personalInfo.stateOrProvinceLabel',
          }),
        },
      },
      {
        id: 'country',
        selectProps: {
          options: countryOptions,
          selectedOptions: selectedCountry ? [selectedCountry] : [],
          validationText: patientValidationTexts[ValidFormFieldNames.Country],
          onChange: ([option]: Option[]) => {
            setSelectedCountry(option);
            const validationTextId = validators[ValidFormFieldNames.Country](
              option
            );

            const validationMessage = validationTextId
              ? intl.formatMessage({ id: validationTextId })
              : '';

            dispatch(
              updateValidationText(
                ValidFormFieldNames.Country,
                validationMessage
              )
            );
          },
          required: true,
          placeholder: intl.formatMessage({
            id: 'patients.personalInfo.countryPlaceholder',
          }),
          labelText: intl.formatMessage({
            id: 'patients.personalInfo.countryLabel',
          }),
        },
      },
    ],
  ];

  const buildPatientRecord = (): Patients.PatientRecordPersonalInformation => {
    const inputValues = getInputValues([
      fullNameRef,
      idDocumentNumberRef,
      professionRef,
      phoneNumberRef,
      emailRef,
      zipcodeRef,
      addressRef,
      professionRef,
      cityRef,
    ]);

    for (const key in inputValues) {
      const formFieldName = key as ValidFormFieldNames;
      const validationTextId = validators[formFieldName](
        inputValues[formFieldName]
      );

      if (!validationTextId) continue;

      const validationMessage = validationTextId
        ? intl.formatMessage({ id: validationTextId })
        : '';

      dispatch(updateValidationText(formFieldName, validationMessage));
    }

    const selectValues: ValueMap<Option | null> = {
      [ValidFormFieldNames.IdDocumentType]: selectedDocumentType,
      [ValidFormFieldNames.Gender]: selectedGender,
      [ValidFormFieldNames.MaritalStatus]: selectedMaritalStatus,
      [ValidFormFieldNames.EducationLevel]: selectedEducationLevel,
      [ValidFormFieldNames.State]: selectedStateOrProvince,
      [ValidFormFieldNames.Country]: selectedCountry,
    };

    for (const key in selectValues) {
      const formFieldName = key as ValidFormFieldNames;
      const validationTextId = validators[formFieldName](
        selectValues[formFieldName]
      );

      if (!validationTextId) continue;

      const validationMessage = validationTextId
        ? intl.formatMessage({ id: validationTextId })
        : '';

      dispatch(updateValidationText(formFieldName, validationMessage));
    }

    if (!socialEconomicLevel) {
      dispatch(
        updateValidationText(
          ValidFormFieldNames.SocialEconomicLevel,
          intl.formatMessage({
            id: 'patients.personalInfo.validation.noSocialEconomicLevel',
          })
        )
      );
    }

    const birthDateValidationTextId = validators[ValidFormFieldNames.BirthDate](
      birthDate || null
    );

    if (birthDateValidationTextId) {
      dispatch(
        updateValidationText(
          ValidFormFieldNames.BirthDate,
          intl.formatMessage({ id: birthDateValidationTextId })
        )
      );
    }

    return {
      name: fullNameRef.current?.value || '',
      documentType: selectedDocumentType?.key || '',
      document: (idDocumentNumberRef.current?.value || '').replace(
        /[^0-9]/g,
        ''
      ),
      birthdate: birthDate?.toISOString() || null,
      gender: parseInt(selectedGender?.key || '') || 0,
      education: selectedEducationLevel?.key || '',
      occupation: professionRef.current?.value || '',
      phone: phoneNumberRef.current?.value || '',
      email: emailRef.current?.value || '',
      maritalStatus: selectedMaritalStatus?.key || '',
      postalCode: zipcodeRef.current?.value || '',
      street: addressRef.current?.value || '',
      city: cityRef.current?.value || '',
      state: selectedStateOrProvince?.key || '',
      country: selectedCountry?.key || '',
      economicClassification: socialEconomicLevel,
    };
  };

  const onNextClick = () =>
    debounce(function onNextClick(
      patientRecord: Patients.PatientRecordPersonalInformation
    ) {
      const inputValues = getInputValues([
        fullNameRef,
        idDocumentNumberRef,
        professionRef,
        phoneNumberRef,
        emailRef,
        zipcodeRef,
        addressRef,
        cityRef,
      ]);

      let dirtyFields = false;

      for (const key in inputValues) {
        const formFieldName = key as ValidFormFieldNames;
        const validationTextId = validators[formFieldName](
          inputValues[formFieldName]
        );

        const validationMessage = validationTextId
          ? intl.formatMessage({ id: validationTextId })
          : '';

        if (validationMessage) {
          dirtyFields = true;
        }

        dispatch(updateValidationText(formFieldName, validationMessage));
      }

      const selectValues: ValueMap<Option | null> = {
        [ValidFormFieldNames.IdDocumentType]: selectedDocumentType,
        [ValidFormFieldNames.Gender]: selectedGender,
        [ValidFormFieldNames.MaritalStatus]: selectedMaritalStatus,
        [ValidFormFieldNames.State]: selectedStateOrProvince,
        [ValidFormFieldNames.Country]: selectedCountry,
      };

      for (const key in selectValues) {
        const formFieldName = key as ValidFormFieldNames;
        const validationTextId = validators[formFieldName](
          selectValues[formFieldName]
        );

        const validationMessage = validationTextId
          ? intl.formatMessage({ id: validationTextId })
          : '';

        if (validationMessage) {
          dirtyFields = true;
        }

        dispatch(updateValidationText(formFieldName, validationMessage));
      }

      dispatch(
        updateValidationText(
          ValidFormFieldNames.SocialEconomicLevel,
          !socialEconomicLevel
            ? intl.formatMessage({
                id: 'patients.personalInfo.validation.noSocialEconomicLevel',
              })
            : ''
        )
      );

      if (!socialEconomicLevel) {
        dirtyFields = true;
      }

      const birthDateValidationTextId = validators[
        ValidFormFieldNames.BirthDate
      ](birthDate || null);

      dispatch(
        updateValidationText(
          ValidFormFieldNames.BirthDate,
          birthDateValidationTextId
            ? intl.formatMessage({ id: birthDateValidationTextId })
            : ''
        )
      );

      if (birthDateValidationTextId) {
        dirtyFields = true;
      }

      if (dirtyFields)
        return dispatch(
          displayToast({
            id: 'patients-invalid-fields',
            kind: 'warning',
            titleKey: 'common.uhh',
            subtitleKey: 'patients.personalInfo.invalidFields',
            timeout: 5e3,
          })
        );

      if (!patientId) {
        dispatch(
          createPatient(patientRecord, function onFinish(newPatientId: string) {
            navigate(
              ROUTE_PATIENTS_CREATE_CLINICAL_INFO.replace(
                ':verb',
                'create'
              ).replace(':id', newPatientId)
            );
          })
        );
      } else {
        dispatch(
          editPatient(patientId, patientRecord, function onFinish(
            patientId: string
          ) {
            navigate(
              ROUTE_PATIENTS_EDIT_CLINICAL_INFO.replace(
                ':verb',
                'edit'
              ).replace(':id', patientId)
            );
          })
        );
      }
    },
    500)(buildPatientRecord());

  function validateFromInputEvent(
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const input = event.target;
    const formFieldName = input.name as ValidFormFieldNames;
    const validateFn = validators[formFieldName];
    const validationTextId = validateFn(input.value);
    const validationMessage = validationTextId
      ? intl.formatMessage({ id: validationTextId })
      : '';

    const currentValidationText = patientValidationTexts[formFieldName];

    if (
      currentValidationText === validationMessage ||
      (!currentValidationText && !validationMessage) ||
      (!currentValidationText && event.type === 'change')
    )
      return;

    dispatch(updateValidationText(formFieldName, validationMessage));
  }

  const onEnableEditClick = () => {
    debounce(function onEnableEditClick() {
      setDisableEdit(false);
    }, 500)();
  };

  return (
    <>
      {(isFocusedPatientLoading ||
        isZipcodeLookupLoading ||
        !focusedPatient) && (
        <Dimmer active inverted>
          <Loader size="large" />
        </Dimmer>
      )}
      <PersonalInfoComponent
        {...{
          fields,
          birthDate,
          fullNameField,
          idDocumentTypeField,
          idDocumentNumberField,
          educationLevelField,
          professionField,
          birthDateValidationText:
            patientValidationTexts[ValidFormFieldNames.BirthDate],
          selectedAgeRange: selectedAgeRange || undefined,
          onDateSelected: function (dateObj: Date) {
            dispatch(updateValidationText(ValidFormFieldNames.BirthDate, ''));
            setSelectedAgeRange(getAgeRange(dateObj));
            return setBirthDate(dateObj);
          },
          currentSocialEconomicLevel,
          disableEdit,
          onNextClick,
          onEnableEditClick,
        }}
      />
    </>
  );
};

function getAgeRange(birthDate: Date): string {
  const age = calculateAge(birthDate);

  if (age <= AGE_RANGES.CHILDREN[1]) return 'common.ageRanges.children';
  if (age >= AGE_RANGES.ELDER[0]) return 'common.ageRanges.elder';
  if (age >= AGE_RANGES.YOUNG[0] && age <= AGE_RANGES.YOUNG[1])
    return 'common.ageRanges.young';
  if (age >= AGE_RANGES.ADULT[0] && age <= AGE_RANGES.ADULT[1])
    return 'common.ageRanges.adult';
  return '';
}

export default PersonalInfoContainer;
