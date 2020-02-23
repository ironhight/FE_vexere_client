import styled from "styled-components";

export const Price = styled.div`
  font-size: ${props => props.priceFont || "15px"};
  font-weight: ${props => props.priceFont || "bold"};
`;
