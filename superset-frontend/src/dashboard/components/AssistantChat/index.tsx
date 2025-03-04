import { createContext, CSSProperties, FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { styled, t } from '@superset-ui/core';
import Icons from 'src/components/Icons';
import cx from 'classnames';
import Loading from 'src/components/Loading';
import Header from "./Header";
import { throttle } from 'lodash';
import Chat from "./Chat";
import { CSSObject } from "@emotion/react";


const BarWrapper = styled.div<{ width: number }>`
  width: ${({ theme }) => theme.gridUnit * 8}px;

  & .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }
  &.open {
    width: ${({ width }) => width}px; // arbitrary...
  }
`;

const Bar = styled.div<{ width: number }>`
  ${({ theme, width }) => `
    & .ant-typography-edit-content {
      right: 0;
      margin-top: 0;
      width: 100%;
    }
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: column;
    flex-grow: 1;
    width: ${width}px;
    background: ${theme.colors.grayscale.light5};
    border-left: 1px solid ${theme.colors.grayscale.light2};
    border-bottom: 1px solid ${theme.colors.grayscale.light2};
    min-height: 100%;
    display: none;
    &.open {
      display: flex;
    }
  `}
`;

const CollapsedBar = styled.div<{ offset: number }>`
  ${({ theme, offset }) => `
    position: absolute;
    top: ${offset}px;
    right: 0;
    
    width: ${theme.gridUnit * 8}px;
    padding-top: ${theme.gridUnit * 2}px;
    display: none;
    text-align: center;
    &.open {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: ${theme.gridUnit * 2}px;
    }
    svg {
      cursor: pointer;
    }
  `}
`;

const StyledCollapseIcon = styled(Icons.Expand)`
  ${({ theme }) => `
    color: ${theme.colors.primary.base};
    margin-bottom: ${theme.gridUnit * 3}px;
  `}
`;

const CollapsedLabel = styled.span`
    writing-mode: sideways-lr;
    text-wrap-mode: nowrap;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.grayscale.base};
`;

export const ChatBarScrollContext = createContext(false);


interface Props {
    isInitialized: boolean;
    width: number;
    height: string | number;
    toggleChatBar: (b: boolean) => void;
    offset: number;
    chatOpen: boolean;
}

const AssistentBar: FC<Props> = ({
    isInitialized,
    width,
    toggleChatBar,
    offset,
    chatOpen,
}) => {
    const openChatBar = useCallback(
        () => toggleChatBar(true),
        [toggleChatBar],
    );

    const tabPaneStyle = useMemo(
        () => ({ overflow: 'auto', flex: 1, overscrollBehavior: 'contain', position: 'relative' } as CSSObject),
        [],
      );

    const [isScrolling, setIsScrolling] = useState(false);
    const timeout = useRef<any>();

    const onScroll = useMemo(
        () =>
          throttle(() => {
            clearTimeout(timeout.current);
            setIsScrolling(true);
            timeout.current = setTimeout(() => {
              setIsScrolling(false);
            }, 300);
          }, 200),
        [],
      );

    useEffect(() => {
        document.onscroll = onScroll;
        return () => {
          document.onscroll = null;
        };
      }, [onScroll]);

    return (
        <ChatBarScrollContext.Provider value={isScrolling}>
            <BarWrapper
                className={cx({ open: chatOpen })}
                width={width}
            >
                <CollapsedBar
                    className={cx({ open: !chatOpen })}
                    onClick={openChatBar}
                    role="button"
                    offset={offset}
                >
                    <StyledCollapseIcon
                        iconSize="l"
                    />
                    <CollapsedLabel>{t('AI Assistant')}</CollapsedLabel>
                    
                </CollapsedBar>
                <Bar className={cx({ open: chatOpen })} width={width}>
                    <Header toggleChatBar={toggleChatBar} />
                    {!isInitialized ? (
                    <div css={{ flex: 1 }}>
                        <Loading />
                    </div>
                    ) : (
                    <div css={tabPaneStyle} onScroll={onScroll} >
                        <Chat messages={[
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test", align: "left"}, 
                            {text: "test send by you", align: "right"},
                            {text: "test send by you with multiple lines, like as long as possible so it covers even more than 2 lines", align: "right"},
                            ]} />
                    </div>
                    )}
                </Bar>
            </BarWrapper>
        </ChatBarScrollContext.Provider>
    )
};
export default memo(AssistentBar);