import { endOfDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import InternalError from '../../components/Errors/InternalError';
import PatientsHomeComponent from '../../components/Patients/Home';
import { selectors, actions } from '../../modules/patients';
import { clearFocusedPatient } from '../../modules/patients/actions';
import { debounce } from '../../utils/functional';

const isoWithoutMillis = (d: Date) => d.toISOString().split('.')[0];

export default function PatientsHomeContainer() {
  const dispatch = useDispatch();
  const patientsList = useSelector(selectors.patientsList);
  const pagination = useSelector(selectors.pagination);
  const isPatientsListLoading = useSelector(selectors.isPatientsListLoading);
  const didPatientsError = useSelector(selectors.didPatientsError);

  const [offset, setOffset] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [filterName, setFilterName] = useState<string>('');
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    dispatch(clearFocusedPatient());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      actions.loadPatientsRequest({
        offset,
        limit: pagination.per_page,
        filter,
      })
    );
  }, [offset, dispatch, pagination.per_page, filter]);

  useEffect(() => {
    const filterArr = [];

    if (filterName) {
      filterArr.push({
        name: `=%${filterName}%`,
      });
    }

    if (filterDate) {
      filterArr.push(
        {
          created: `>${isoWithoutMillis(filterDate)}z`,
        },
        {
          created: `<${isoWithoutMillis(endOfDay(filterDate))}z`,
        }
      );
    }

    setFilter(
      filterArr
        .map((filterPart) => Object.entries(filterPart)[0].join(''))
        .join(';')
    );
  }, [filterDate, filterName]);

  if (isPatientsListLoading || !patientsList) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  if (!isPatientsListLoading && didPatientsError) {
    return <InternalError />;
  }

  const onPageChange = (page: number): void => {
    const offset = page - 1;
    setOffset(offset);
  };

  const searchByName = (name: string): void => {
    setFilterName(name);
  };

  const resetFilters = () => {
    setFilter('');
    setFilterName('');
    setFilterDate(undefined);
  };

  return (
    <PatientsHomeComponent
      patientRows={patientsList}
      activePage={pagination.current_page}
      totalPages={pagination.last_page}
      onPageChange={onPageChange}
      onDateSelected={debounce(setFilterDate, 500)}
      searchByName={debounce(searchByName, 500)}
      filterName={filterName}
      filterDate={filterDate}
      resetFilters={resetFilters}
    />
  );
}
