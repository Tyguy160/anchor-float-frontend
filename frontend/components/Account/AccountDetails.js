import styled from 'styled-components';
import ChangePassword from './ChangePassword';
const ContactCard = styled.div``;

import { ComponentContainer } from '../styles/styles';

const AccountDetails = () => {
  return (
    <ComponentContainer>
      <ContactCard>Contact Card Goes Here</ContactCard>
      <ChangePassword />
    </ComponentContainer>
  );
};

export default AccountDetails;
