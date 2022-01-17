import React from 'react';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

type Props = {
  icon: React.FC<SvgProps>;
  text: string;
}

export function AccessoryCard({ text, icon: Icon }: Props){
  return (
    <S.Container>
      <Icon />
      <S.InfoCardText>{text}</S.InfoCardText>
    </S.Container>
  );
}