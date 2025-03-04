import { styled } from "@superset-ui/core";
import { FC, memo } from "react";
import Icons from "src/components/Icons";


const Wrapper = styled.div`
    padding: ${({ theme }) => theme.gridUnit * 7}px ${({ theme }) => theme.gridUnit * 10}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.gridUnit * 2}px;
`;

const InputField = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.gridUnit * 2}px;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.grayscale.light5};
    font-size: ${({ theme }) => theme.typography.sizes.m}px;
    color: ${({ theme }) => theme.colors.grayscale.dark1};
    outline: none;
    box-shadow: #0000002e 0px 5px 8px 0px;
`;

const SendIcon = styled(Icons.Collapse)`
  ${({ theme }) => `
    color: ${theme.colors.primary.base};
    cursor: pointer;
  `}

    border-radius: 100%;
    padding: ${({ theme }) => theme.gridUnit}px;
    transition: background-color 0.3s;

    &:hover {
        ${({ theme }) => `
            background-color: ${theme.colors.grayscale.light2};
        `}
    }
`;


interface Props {
}

const MessageInput: FC<Props> = () => {
    return (
        <Wrapper>
            <InputField />
            <SendIcon />
        </Wrapper>
    );
}
export default memo(MessageInput);
