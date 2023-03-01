import styled from "styled-components";

export const AddEvent = styled.div`
    display:flex;
    justify-content: center;
    width:-webkit-fill-available;
    margin: 10px 5px;
    input{
        height: 15px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        width: 70%;
        border: 1px solid gray;
        padding: 5px;
        &:focus{
            all:unset;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            width: 70%;
            border: 1px solid gray;
            background: white;
            padding: 5px;
        }
    }
    
    button{
        background: #2b7afa;
        color: white;
        border: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        &:hover{
            background: #4b8fff;
        }
    }
`
export const DateCont = styled.div`
    box-shadow: none !important;
    margin: 3px;
    padding: 3px 6px;
`

export const DayWrapper = styled.div<{ active: boolean, today: boolean, onClick: (e: Event) => void, onDrop?: (e: React.DragEvent<HTMLDivElement>) => void }>`
    min-width: 30px;
    width: inherit;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: none !important;
    border-right: 1px solid gray;
    align-items: flex-start;
    min-height: 100px;
    position: relative;
    background: ${props => (props.active ? "white" : "#d1d1d1")};
    
    .today{
        background: #2b7afa;
        color: white;
        border-radius 50%;
    }
    &:nth-last-child(1){
      border-right: 0;
    }
    .hidden{
        display:none;
    }

    `

