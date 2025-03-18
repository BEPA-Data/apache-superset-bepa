import { css, styled, t } from '@superset-ui/core';
import { FC, memo, useEffect, useMemo, useRef } from 'react';
import Input from './Input';
import { Message } from './types';

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${({ theme }) => theme.gridUnit * 8}px;
  padding: ${({ theme }) => `
      ${theme.gridUnit * 8}px
      ${theme.gridUnit * 4}px
  `};
  text-align: center;
`;

const Title = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.sizes.m}px;
    color: ${theme.colors.grayscale.light1};
    margin: ${theme.gridUnit * 2}px 0 0 0;
    font-weight: ${theme.typography.weights.bold};
  `}
`;

const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.sizes.s}px;
    color: ${theme.colors.grayscale.light1};
    margin: ${theme.gridUnit * 2}px 0 0 0;
  `}
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
  padding: ${({ theme }) => theme.gridUnit * 3}px
    ${({ theme }) => theme.gridUnit * 5}px
    ${({ theme }) => theme.gridUnit * 5}px;
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

const Message = styled.div<{ align: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align }) =>
    align === 'right' ? 'flex-end' : 'flex-start'};
  ${({ align }) =>
    align === 'right' ? 'margin-left: 20%;' : 'margin-right: 20%;'}

  & > div {
    ${({ theme }) => `
      background-color: ${theme.colors.grayscale.light5};
      padding: ${theme.gridUnit * 2}px
        ${theme.gridUnit * 3}px;
      border-radius: ${theme.borderRadius}px;
      margin: 0;
      box-shadow: ${theme.colors.shadow.base} 0px 5px 8px 0px;
    `}
  }
`;

interface Props {
  messages: Message[];
  sendMessage: (message: string) => void;
}

const Chat: FC<Props> = ({ messages, sendMessage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const messageElements = useMemo(
    () =>
      messages.map((message, index) => (
        <Message key={index} align={message.align}>
          <div>{message.text}</div>
        </Message>
      )),
    [messages],
  );

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <>
      <Background>
        {messages.length === 0 && (
          <>
            <Title>{t('An assistant that can analyse the data for you')}</Title>
            <Description>{t('Ask me anything!')}</Description>
          </>
        )}
      </Background>
      <Wrapper>
        <MessageContainer ref={containerRef}>
          {messageElements}
        </MessageContainer>
        <Input submit={sendMessage} />
      </Wrapper>
    </>
  );
};
export default memo(Chat);
