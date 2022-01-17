import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import ArrowSvg from '../../assets/arrow.svg';

import * as S from './styles';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';

type RentalPeriod = {
  startFormated: string;
  endFormated: string;
}

type RouteParams = {
  car: CarDTO;
}

export function Scheduling(){
  const theme = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  function handleConfirmRental() {    
    navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
      startFormated: format(parseISO(firstDate), 'dd/MM/yyyy'),
      endFormated: format(parseISO(endDate), 'dd/MM/yyyy'),
    });
  }

  return (
    <S.Container>
      <StatusBar 
        barStyle='light-content' 
        translucent 
        backgroundColor="transparent"
      />
      <S.Header>
        <BackButton color={theme.colors.shape}/>

        <S.Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.startFormated}>
              {rentalPeriod.startFormated}
            </S.DateValue>
          </S.DateInfo>

          <ArrowSvg />
          
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormated}>
              {rentalPeriod.endFormated}
            </S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </S.Content>

      <S.Footer>
        <Button 
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormated}
        />
      </S.Footer>

    </S.Container>
  );
}