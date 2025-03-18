import { styled } from '@superset-ui/core';
import { FC, memo, useCallback, useRef } from 'react';
import Icons from 'src/components/Icons';

const Wrapper = styled.div`
  padding: ${({ theme }) => `
    ${theme.gridUnit * 2}px
    10%
    ${theme.gridUnit * 7}px
    10%
  `};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gridUnit * 2}px;

  box-shadow: ${({ theme }) => theme.colors.grayscale.light5} 0px -2px 8px 8px;
`;

const InputField = styled.input`
  ${({ theme }) => `
    width: 100%;
    padding: ${theme.gridUnit * 2}px;
    border: none;
    border-radius: ${theme.borderRadius}px;
    margin: 0;
    background-color: ${theme.colors.grayscale.light5};
    font-size: ${theme.typography.sizes.m}px;
    color: ${theme.colors.grayscale.dark1};
    outline: none;
    box-shadow: ${theme.colors.shadow.base} 0px 5px 8px 0px;
  `}
`;

const SendIcon = styled(Icons.CheckOutlined)`
  ${({ theme }) => `
    color: ${theme.colors.primary.base};
    cursor: pointer;
  `}

  border-radius: 100%;
  padding: ${({ theme }) => theme.gridUnit}px;
  transition: background-color 0.3s;
  width: ${({ theme }) => theme.gridUnit * 8}px;
  height: ${({ theme }) => theme.gridUnit * 8}px;

  &:hover {
    ${({ theme }) => `
      background-color: ${theme.colors.grayscale.light2};
    `}
  }
`;

interface Props {
  submit: (text: string) => void;
}

const MessageInput: FC<Props> = ({ submit }) => {
  const input = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(() => {
    if (input.current?.value) {
      submit(input.current.value);
      input.current.value = '';
    }
  }, [submit]);

  const onEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );

  return (
    <Wrapper>
      <InputField ref={input} onKeyDown={onEnter} />
      <SendIcon onClick={onSubmit} />
    </Wrapper>
  );
};
export default memo(MessageInput);
