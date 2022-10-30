import styled from "styled-components";

export const ListItems = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`
export const Button = styled.button`
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  border-color: orange;
  background-color: #fff;
  color: orange;
  font-size: 14px;
  margin-top: auto;
  margin-bottom: auto;

  &:hover,
  &:focus {
    background-color: orange;
    color: #fff;
  }
`
export const Text = styled.p`
  margin-right: 8px;
  line-height: 0px;
  font-size: 18px;
  width: auto;
  padding: 10px;
  color: white;
  border: 1px solid orange;
  border-radius: 10px;
  background-color: orange;
`
