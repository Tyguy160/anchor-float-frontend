import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import toasts from '../Misc/Toasts';
import { Formik } from 'formik';
import TextInput from '../Misc/TextInput';
import * as Yup from 'yup';

const DomainSchema = Yup.object().shape({
  hostname: Yup.string()
    .url('Enter a valid URL')
    .required('Required'),
  minimumReview: Yup.number('Enter a valid number')
    .lessThan(5, 'Minimum review must be less than 5')
    .min(0, 'Enter a positive number')
    .required('Required'),
});

import {
  GET_CURRENT_USER,
  ADD_USERSITE_MUTATION,
} from '../resolvers/resolvers';

import {
  StyledForm,
  FormContainer,
  ContinueButton,
  ComponentContainer,
  CenteredH2,
} from '../styles/styles';

const AddDomain = props => {
  const { loading: userLoading, data: user } = useQuery(GET_CURRENT_USER);

  const [addUserSite] = useMutation(ADD_USERSITE_MUTATION, {
    refetchQueries: ['userSites'],
  });

  const addDomainToUser = async (values, e) => {
    const { hostname, apiKey, minimumReview } = values;
    console.log(hostname);
    try {
      const res = await addUserSite({
        variables: {
          input: {
            hostname,
            apiKey,
            minimumReview,
            runningReport: false,
          },
        },
      });

      toasts.successMessage('Domain has been added.');
    } catch (err) {
      console.log(err);
      toasts.errorMessage('This domain has already been added to your site.');
    }
  };

  return (
    <ComponentContainer>
      <CenteredH2>Add A Domain</CenteredH2>
      <FormContainer style={{ border: `none` }}>
        <Formik
          initialValues={{
            hostname: '',
            apiKey: '',
            minimumReview: '',
          }}
          validationSchema={DomainSchema}
          onSubmit={(values, e) => addDomainToUser(values, e)}>
          {formik => (
            <StyledForm onSubmit={formik.handleSubmit}>
              <TextInput label="Domain" name="hostname" type="text"></TextInput>
              <TextInput label="API Key" name="apiKey" type="text"></TextInput>
              <TextInput
                label="Min. Review"
                name="minimumReview"
                type="number"></TextInput>
              {formik.status && formik.status.msg && (
                <div>{formik.status.msg}</div>
              )}
              <ContinueButton
                style={{ marginTop: `10px` }}
                type="submit"
                value="Add domain">
                Add domain
              </ContinueButton>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </ComponentContainer>
  );
};

export default AddDomain;
