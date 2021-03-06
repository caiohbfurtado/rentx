import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  position: absolute;
  left: 24px;
  top: ${getStatusBarHeight() + 18}px;
  z-index: 999;
`;

export const CarImages = styled.View`
  margin-top: 36px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: false,
})`
`;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 36px;
`;

export const Description = styled.View`

`;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(25)}px;
  margin-top: 4px;
`;

export const Rent = styled.View`
  
`;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};
  font-size: ${RFValue(25)}px;
  margin-top: 4px;
`;

export const Accessories = styled.View`
  width: 100%;
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const About = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  text-align: justify;
  line-height: ${RFValue(25)}px;
  margin: 23px 0;
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px 24px ${getBottomSpace() + 24}px;
`;