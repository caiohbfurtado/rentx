import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

type ContainerProps = {
  color?: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, color }) => color ? color : theme.colors.main};

  ${({ enabled }) => !enabled && css`
    opacity: 0.5;
  `};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;