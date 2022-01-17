import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { format, parseISO } from 'date-fns';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

import * as S from './styles';

import { AccessoryCard } from '../../components/AccessoryCard';
import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { api } from '../../services/api';

type RouteParams = {
  car: CarDTO;
  dates: string[];
}

type SchedulesByCars = {
  id: string;
  unavailable_dates: string[];
}

export function SchedulingDetails(){
  const theme = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirmRental() {
    try {
      setIsLoading(true);
      const schedulesByCar = await api.get<SchedulesByCars>(`/schedules_bycars/${car.id}`);
      
      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ].sort();
      
      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: dates[0],
        endDate: dates[dates.length - 1]
      });
  
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      }); 

      navigate('SchedulingComplete');
    } catch (error) {
      Alert.alert("Não foi possível fazer a locação do veículo");
    } finally {
      setIsLoading(false);
    }
  }

  const initialDate = useMemo(() => {
    return format(parseISO(dates[0]), 'dd/MM/yyyy');
  }, [dates]);
  
  const finalDate = useMemo(() => {
    return format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy');
  }, [dates]);

  const totalPrice = useMemo(() => {
    return car.rent.price * dates.length;
  }, [car, dates]);

  return (
    <S.Container>
      <S.Header>
        <BackButton />
      </S.Header>

      <S.CarImages>
        <ImageSlider 
          imagesUrl={[car.thumbnail]}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          {
            car.accessories.map(accessory => (
              <AccessoryCard 
                icon={getAccessoryIcon(accessory.type)}
                text={accessory.name}
                key={accessory.name} 
              />
            ))
          }
        </S.Acessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>
              {initialDate}
            </S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
          
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>
              {finalDate}
            </S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>Total</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              R$ {car.rent.price} x {dates.length} diárias
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>
              R$ {totalPrice}
            </S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>
      
      <S.Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          isLoading={isLoading}
          enabled={!isLoading}
        />
      </S.Footer>
    </S.Container>
  );
}