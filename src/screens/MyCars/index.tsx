import React, { Fragment, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { api } from '../../services/api';
import { SchedulesByUser } from '../../dtos/SchedulesByUser';
import { ScheduleCard } from '../../components/ScheduleCard';
import { Load } from '../../components/Load';

export function MyCars(){
  const [schedules, setSchedules] = useState<SchedulesByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    async function fetchSchedulesByUser() {
      try {
        const allSchedules = await api.get<SchedulesByUser[]>(`/schedules_byuser?user_id=${1}`);
        setSchedules(allSchedules.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSchedulesByUser();
  }, []);

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

        <S.Subtitle>Conforto, segurança e praticidade.</S.Subtitle>
      </S.Header>

      { isLoading ? (
        <Load />
      ) : (
        <S.Content>
          <S.Schedulings>
            <S.SchedulingsText>Agendamentos feitos</S.SchedulingsText>
            <S.SchedulingsQuantity>2</S.SchedulingsQuantity>
          </S.Schedulings>
          
          {schedules.map(schedule => (
            <ScheduleCard schedule={schedule} key={schedule.id}/>
          ))}

        </S.Content>
      )}
    </S.Container>
  );
}