import React, { Fragment, useMemo } from 'react';
import { SchedulesByUser } from '../../dtos/SchedulesByUser';
import { format, parseISO } from 'date-fns';

import * as S from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarCard } from '../CarCard';

type Props = {
  schedule: SchedulesByUser;
}

export function ScheduleCard({ schedule }: Props){
  const MotorIcon = useMemo(() => getAccessoryIcon(schedule.car.fuel_type), [schedule]);

  const initialData = useMemo(() => format(parseISO(schedule.startDate), 'dd/MM/yyyy'), [schedule]);
  
  const finalData = useMemo(() => format(parseISO(schedule.endDate), 'dd/MM/yyyy'), [schedule]);

  return (
    <Fragment>
      <CarCard 
        data={schedule.car}
      />

      <S.CardPeriod>
        <S.TitleCard>período</S.TitleCard>
        <S.TextPeriodWrapper>
          <S.DateText>{initialData}</S.DateText>
          <ArrowSvg 
            width={20} 
            height={20}
            style={{
              marginHorizontal: 10,
            }}
          />
          <S.DateText>{finalData}</S.DateText>
        </S.TextPeriodWrapper>
      </S.CardPeriod>
    </Fragment>
  );
}