import styled from "styled-components";

export const MainWrapper = styled.div`
  /* border: 10px solid green; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "depth map" 
  "output output";
  grid-template-rows: 400px 1fr;
  min-height: 100vh;
  grid-gap: 10px;
  padding: 16px;
`;

export const DepthFormContainer = styled.div`
  grid-area: depth;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.09);
  border: 10px solid white;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 10px solid gray; */
`;

export const MapContainer = styled.div`
  grid-area: map;
  /* border: 10px solid pink; */
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.09);
  border: 10px solid white;
`;

export const OutputContainer = styled.div`
  grid-area: output;
  /* border: 10px solid orange; */
`;