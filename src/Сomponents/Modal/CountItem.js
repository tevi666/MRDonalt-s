import React from "react";
import styled from "styled-components";

const CountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CountInput = styled.input`
	width: 30px;
  height: 30px;
	font-size: 19px;
  border-radius:50%;
  position: relative;
  top: 2px;
`;
const ButtonCount = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border-radius: 5%;
`;

export function CountItem({ count, setCount, onChange }) {
  return (
    <CountWrapper>
      <span>Количество</span>
      <div>
        <ButtonCount disabled={count <= 1} onClick={() => setCount(count - 1)}>
          -
        </ButtonCount>
        <CountInput
          type="number"
          min="1"
          max="100"
          value={count < 1 ? 1 : count}
          onChange={onChange}
        />
        <ButtonCount onClick={() => setCount(count + 1)}>+</ButtonCount>
      </div>
    </CountWrapper>
  );
}
