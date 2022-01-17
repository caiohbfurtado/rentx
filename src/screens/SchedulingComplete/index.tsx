import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import * as S from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { RFPercentage } from 'react-native-responsive-fontsize';

export function SchedulingComplete(){
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  
  function handleConfirm() {
    navigate("Home");
  }

  return (
    <S.Container>
      <StatusBar 
        barStyle='light-content' 
        translucent 
        backgroundColor="transparent" 
      />
      <LogoSvg 
        width={width}
        style={{ position: "absolute", top: RFPercentage(10) }}
      />

      <S.Content>
        <DoneSvg width={80} height={80}/>

        <S.Title>Carro alugado!</S.Title>
        <S.Message>
          Agora voce só precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar o seu automóvel.
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton 
          title='OK'
          onPress={handleConfirm}
        />
      </S.Footer>
    </S.Container>
  );
}