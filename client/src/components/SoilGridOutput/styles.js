import styled from "styled-components";

export const ScrollView = styled.div`
  overflow-x: scroll;
`

export const ListWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px 0;
  flex-wrap: nowrap;
  overflow-x: scroll;
  

  @media (min-width: 600px) {
    flex-wrap: wrap;
    overflow-x: unset;
  }
`;


export const ItemWrapper = styled.div`
  min-width: 200px;
  min-height: 200px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.09);
  border: 10px solid white;
  background-color: #f1f5f9;
  display: flex;
  flex-direction: column;
`;


export const SoilTypeWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  color: #334155;
  font-weight: 600;
`;

export const TitleLabel = styled.label`
  text-transform:capitalize;
`;


export const DepthLabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b5998;
  color: white;
  padding: 8px 0;
  font-weight: 600;
`

