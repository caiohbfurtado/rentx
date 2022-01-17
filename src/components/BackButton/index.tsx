import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import * as S from './styles';

type Props = BorderlessButtonProps & {
  color?: string;
}

export function BackButton({ 
  color,
  ...rest
}: Props){
  const theme = useTheme();
  
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  return (
    <S.Container {...rest} onPress={goBack}>
      <MaterialIcons
        name='chevron-left'
        size={24}
        color={color ? color : theme.colors.text}
        />
    </S.Container>
  );
}