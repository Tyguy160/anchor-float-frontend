import styled from 'styled-components';

const HeroContainer = styled.div`
  color: white;
  background-image: url('../static/blake-connally-373084-unsplash.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: grid;
  justify-items: center;
`;

const HeroHeadline = styled.div`
  display: grid;
  font-size: 3em;
  text-align: center;
  align-self: end;
  margin-bottom: 100px;
  text-shadow: 1px 1px 3px #888;
`;

export { HeroContainer, HeroHeadline };
