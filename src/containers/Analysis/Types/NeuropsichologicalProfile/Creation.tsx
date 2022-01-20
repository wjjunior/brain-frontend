import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../../modules/analysis/constants';
import NeuropsichologicalProfileCreationComponent from '../../../../components/Analysis/Types/NeuropsichologicalProfile/Creation';
import { clearNeuropsichologicalProfileDraft } from '../../../../modules/analysis/actions';

import NeuropsichologicalProfilePatientContainer from './Patient';
import NeuropsichologicalProfileIntelectualOperationContainer from './IntelectualOperation';
import NeuropsichologicalProfileUniversalFunctionsMemoryContainer from './UniversalFunctions/Memory';
import NeuropsichologicalProfileUniversalFunctionsAttentionContainer from './UniversalFunctions/Attention';
import NeuropsichologicalProfileExecutiveFunctionsContainer from './ExecutiveFunctions';
import NeuropsichologicalProfileCognitiveFunctionsContainer from './CognitiveFunctions';
import NeuropsichologicalProfileAdditionalInformationContainer from './AdditionalInformation';
import NeuropsichologicalProfileFinishContainer from './Finish';

const NeuropsichologicalProfileCreationContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    return () => {
      dispatch(clearNeuropsichologicalProfileDraft());
    };
  }, [dispatch]);

  return (
    <NeuropsichologicalProfileCreationComponent>
      <Routes>
        <Route
          path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_PATIENT.replace(
            ROUTES.CREATE_NEUROPSICHOLOGICAL_PROFILE,
            ''
          )}
          element={<NeuropsichologicalProfilePatientContainer />}
        />
        <Route
          path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_INTELECTUAL_OPERATION.replace(
            ROUTES.CREATE_NEUROPSICHOLOGICAL_PROFILE,
            ''
          )}
          element={<NeuropsichologicalProfileIntelectualOperationContainer />}
        />
        <Route
          path={
            ROUTES.NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS.replace(
              ROUTES.CREATE_NEUROPSICHOLOGICAL_PROFILE,
              ''
            ) + '/*'
          }
        >
          <Route
            path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_MEMORY.replace(
              ROUTES.NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS,
              ''
            )}
            element={
              <NeuropsichologicalProfileUniversalFunctionsMemoryContainer />
            }
          />
          <Route
            path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_ATTENTION.replace(
              ROUTES.NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS,
              ''
            )}
            element={
              <NeuropsichologicalProfileUniversalFunctionsAttentionContainer />
            }
          />
          <Route
            path="//*"
            element={
              <Navigate
                to={
                  ROUTES.NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_MEMORY
                }
                replace
              />
            }
          />
        </Route>
        <Route
          path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_EXECUTIVE_FUNCTIONS.replace(
            ROUTES.CREATE_NEUROPSICHOLOGICAL_PROFILE,
            ''
          )}
          element={<NeuropsichologicalProfileExecutiveFunctionsContainer />}
        />
        <Route
          path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_COGNITIVE_FUNCTIONS.replace(
            ROUTES.CREATE_NEUROPSICHOLOGICAL_PROFILE,
            ''
          )}
          element={<NeuropsichologicalProfileCognitiveFunctionsContainer />}
        />
        <Route
          path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO.replace(
            ROUTES.CREATE_NEUROPSICHOLOGICAL_PROFILE,
            ''
          )}
          element={<NeuropsichologicalProfileAdditionalInformationContainer />}
        />
        <Route
          path={ROUTES.NEUROPSICHOLOGICAL_PROFILE_FINISH.replace(
            ROUTES.CREATE_NEUROPSICHOLOGICAL_PROFILE,
            ''
          )}
          element={<NeuropsichologicalProfileFinishContainer />}
        />
        <Route
          path="//*"
          element={
            <Navigate
              to={ROUTES.NEUROPSICHOLOGICAL_PROFILE_PATIENT + search}
              replace
            />
          }
        />
      </Routes>
    </NeuropsichologicalProfileCreationComponent>
  );
};

export default NeuropsichologicalProfileCreationContainer;
