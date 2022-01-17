import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import * as S from './styles';

type Props = RectButtonProps & {
  title: string;
  color?: string;
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  isLoading = false,
  ...rest
}: Props){
  const theme = useTheme();

  return (
    <S.Container 
      color={color}
      enabled={enabled}
      {...rest} 
    >
      <S.Title>
        {
          isLoading 
          ? <ActivityIndicator color={theme.colors.shape}/> 
          : title
        }
      </S.Title>
    </S.Container>
  );
}