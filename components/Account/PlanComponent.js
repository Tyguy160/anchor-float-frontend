import {
  StyledTierButton,
  StyledTierHeading,
  StyledPrice,
  StyledTierDetails
} from "../styles/styles";

const PlanComponent = props => {
  return (
    <StyledTierButton
      id={props.planId}
      onClick={props.handlePlanSelect}
      style={{ outline: `none` }}
    >
      <StyledTierHeading>{props.planTitle}</StyledTierHeading>
      <StyledPrice>
        {props.planPrice}
        <div>per month</div>
      </StyledPrice>
      <StyledTierDetails>
        <li style={{ textAlign: `center`, fontWeight: `600` }}>
          {props.planCredits} {props.planCredits > 1 ? "credits " : "credit "}
          monthly
        </li>
        <li style={{ lineHeight: `1.5em` }}>{props.planDescription}</li>
      </StyledTierDetails>
    </StyledTierButton>
  );
};

export default PlanComponent;
