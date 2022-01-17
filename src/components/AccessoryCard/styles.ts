import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 109px;
  height: 92px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background_primary};
  margin-bottom: 8px;
`;

export const InfoCardText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 14px;
`;