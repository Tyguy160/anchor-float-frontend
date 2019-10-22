import {
  StyledTierButton,
  StyledTierHeading,
  StyledPrice,
  StyledTierDetails,
} from '../styles/styles';

const PlanComponent = props => {
  return (
    <StyledTierButton id={props.planId} onClick={props.handlePlanSelect}>
      <StyledTierHeading>{props.planTitle}</StyledTierHeading>
      <StyledPrice>
        {props.planPrice}
        <div>per month</div>
      </StyledPrice>
      <StyledTierDetails>
        <li style={{ textAlign: `center` }}>
          {props.planCredits} credits monthly
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          orci urna.
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          orci urna.
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          orci urna.
        </li>
      </StyledTierDetails>
    </StyledTierButton>
  );
};

export default PlanComponent;
