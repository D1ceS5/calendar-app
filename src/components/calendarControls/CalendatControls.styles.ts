import styled from "styled-components";

export const ControlsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 0;
  .title{
    font-size: 26px;
    
  }  
`
export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

export const ControlButton = styled.button`
  border: 0;
  background: #2b7afa;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  margin: 0 0 10px 10px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background: #4b8fff;
  }
`

export const AccentButton = styled(ControlButton)`
background: #151515;
&:hover {
  background: #414141;
}
`
export const ImportLabel = styled.label`
border: 0;
background: #151515;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  margin: 0 0 10px 10px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background: #414141;
  }
`

export const ImportButton = styled.input`
border: 0;
display:none;
  background: #2b7afa;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  margin: 0 0 0 10px;

  &:hover {
    cursor: pointer;
    background: #4b8fff;
  }
`
export const Filters = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const SearchInput = styled.input`
  padding: 10px;
  min-width: 300px;
  width: 20%;
`

export const LabelFilters = styled.div`
  width: 70%;
  min-width: 300px;
  padding: 10px 0;
  display:flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const LabelButton = styled.div`
  cursor: pointer;
  border-radius: 4px;
  margin-right: 5px;
  padding: 5px 20px;
  
`