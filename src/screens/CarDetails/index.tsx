import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import * as S from './styles';
import { AccessoryCard } from '../../components/AccessoryCard';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

type RouteParams = {
  car: CarDTO;
}

export function CarDetails(){
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton/>
      </S.Header>

      <S.CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
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

        <S.Accessories>
          {car.accessories.map(accessory => (
            <AccessoryCard 
              icon={getAccessoryIcon(accessory.type)} 
              text={accessory.name} 
              key={accessory.name}
            />
          ))}
        </S.Accessories>

        <S.About>{car.about}</S.About>
        
      </S.Content>
      
      <S.Footer>
        <Button 
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  );
}