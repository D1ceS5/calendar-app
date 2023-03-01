import styled from "styled-components";

export const EventData = styled.div`
width: 100%;
display: flex;
`
export const CreateLabel = styled.div`
display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
    width: 100%;
`
export const LabelInputs = styled.div`
width: 100%;
display:flex;
align-items: center;
justify-content: center;
.hidden{
  display:none;
}
`
export const AddLabelButton = styled.button`
width:100%;
border: 0;
border-radius: 2px;
padding: 5px 0;
background: white;
color: black;
`

export const HolidayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  border-radius: 4px;
  background: green;
  color: white;
  padding: 5px;
  margin: 5px;
`

export const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  border-radius: 4px;
  background: #2b7afa;
  color: white;
  padding: 5px;
  margin: 5px;
  cursor: grab;
  .label{
    margin: 3px;
    font-size: 0.7em;
    border-radius: 2px;
    padding: 3px;
  }
  
  .label-title-input{
    width: 70%;
    flex: 4;
  }
  .label-color-input{
    flex: 1;
    width: 25%;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;
  }
  .event-title{
    width:70%;
    border:0;
    color:white;
    background: transparent;
    box-shadow: none !important;
  }
  
  .event-icon{
    cursor: pointer;
    margin:3px;
    width: 10%
  }
 
`