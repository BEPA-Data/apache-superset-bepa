import { styled } from "@superset-ui/core";
import { FC, memo, useMemo } from "react";
import Input from "./Input";
import { Message } from "./types";


const Background = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const Wrapper = styled.div`
    position: absolute;
    top: ${({ theme }) => theme.gridUnit * 2}px;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 ${({ theme }) => theme.gridUnit * 2}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.gridUnit * 3}px ${({ theme }) => theme.gridUnit * 5}px;
    overflow-y: auto;
    flex-grow: 1;
    gap: ${({ theme }) => theme.gridUnit * 2}px;

    ::-webkit-scrollbar {
        width: ${({ theme }) => theme.gridUnit * 1}px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.grayscale.light2};
        border-radius: ${({ theme }) => theme.gridUnit}px;
    }

    ::-webkit-scrollbar-track {
        background: none;
    }
`;

const Message = styled.div<{align: string}>`
    display: flex;
    flex-direction: row;
    justify-content: ${({ align }) => align === 'right' ? 'flex-end' : 'flex-start'};
    ${({ align }) => align === 'right' ? 'margin-left: 20%;' : 'margin-right: 20%;'}

    & > div {
        background-color: ${({ theme }) => theme.colors.grayscale.light5};
        padding: ${({ theme }) => theme.gridUnit * 2}px ${({ theme }) => theme.gridUnit * 3}px;
        border-radius: ${({ theme }) => theme.borderRadius}px;
        margin: 0;
        box-shadow: #0000002e 0px 5px 8px 0px;
    }
`; 


interface Props {
    messages: Message[];
}

const Chat: FC<Props> = ({
    messages,
}) => {

    const messageElements = useMemo(() => messages.map((message, index) => (
        <Message key={index} align={message.align}>
            <div>{message.text}</div>
        </Message>
    )), [messages]);

    return (
        <>
            <Background>

            </Background>
            <Wrapper>
                <MessageContainer>
                    {messageElements}
                </MessageContainer>
                <Input />
            </Wrapper>
        </>
    );
};
export default memo(Chat);
