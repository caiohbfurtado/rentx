import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const TitleCard = styled.Text`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CardPeriod = styled.View`
  background: ${({ theme }) => theme.colors.background_secondary};
  padding: 15px 24px;
  margin-top: 2px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextPeriodWrapper = styled.View`
  flex-direction: row;
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;