import styled from "styled-components";

export const AppFormLabel = styled.label`
  margin-top: 16px;
  color: #fff;
`;

export const AppInputComponent = styled.input`
  padding: 10px 16px;
  background: #fff;
  border: 0 solid transparent;
  border-radius: 4px;
  font-size: 20px;
  outline-color: transparent;
  color: rgb(55, 65, 81);
  margin-top: 14px;
  &:focus {
    outline-width: 0;
  }
`;

export const AppButton = styled.input`
  padding: 10px 16px;
  background-color: #3b5998;
  border: 0 solid transparent;
  border-radius: 4px;
  font-size: 20px;
  outline-color: transparent;
  color: white;
  margin-top: 32px;
  cursor: pointer;
  width: 200px;
  &:focus {
    outline-width: 0;
  }
`;