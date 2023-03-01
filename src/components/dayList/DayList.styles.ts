import styled from "styled-components"

export const DaysHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .item {
    background: #2b7afa;
    color: white;
    width: inherit;
    min-width: 30px;

    padding: 10px;
  }
`

export const DaysWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  

  .line {
    border: 1px solid gray;
    display: flex;
    flex-direction: row;
    margin-top: -1px;
    justify-content: center;
    width: 100%;
   
  }


`