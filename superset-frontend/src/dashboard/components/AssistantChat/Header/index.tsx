import { FC, memo } from "react";
import { css, styled, t, useTheme } from '@superset-ui/core';
import Button from 'src/components/Button';
import Icons from 'src/components/Icons';


const TitleArea = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    padding: 0 ${theme.gridUnit * 2}px ${theme.gridUnit * 2}px;

    & > span {
      font-size: ${theme.typography.sizes.l}px;
      flex-grow: 1;
      font-weight: ${theme.typography.weights.bold};
    }

    & > div:first-of-type {
      line-height: 0;
    }

    & > button > span.anticon {
      line-height: 0;
    }
  `}
`;

const HeaderButton = styled(Button)`
  padding: 0;
`;

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: ${theme.gridUnit * 3}px ${theme.gridUnit * 2}px ${
      theme.gridUnit
    }px;

    .ant-dropdown-trigger span {
      padding-right: ${theme.gridUnit * 2}px;
    }
  `}
`;

const Title = styled.span`
    text-align: right;
`;


interface HeaderProps {
    toggleChatBar: (arg0: boolean) => void;
}

const Header: FC<HeaderProps> = ({
    toggleChatBar,
}) => {
    const theme = useTheme();
    
    return (
        <Wrapper>
            <TitleArea>
                <HeaderButton
                    buttonStyle="link"
                    buttonSize="xsmall"
                    onClick={() => toggleChatBar(false)}
                >
                    <Icons.Collapse iconColor={theme.colors.grayscale.base} />
                </HeaderButton>
                {/* <FilterBarSettings /> */}
                <Title>{t('AI Assistant')}</Title>
            </TitleArea>
        </Wrapper>
    );
};
export default memo(Header);
