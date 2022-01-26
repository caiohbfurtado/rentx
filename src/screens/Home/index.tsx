import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { Load } from '../../components/Load';

import * as S from './styles';

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        console.log('entrou')
        const { data } = await api.get<CarDTO[]>('/cars');
        console.log('entrou')
        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  return (
    <S.Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />

      <S.Header>
        <S.HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <S.TotalCars>
            Total de {cars.length} carros
          </S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      {isLoading ?
        <Load /> :
        <S.CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <CarCard
              data={item}
              onPress={() => handleCarDetails(item)}
            />
          }
        />
      }

      <S.MyCarsButtonWrapper>
        <S.MyCarsButton onPress={handleOpenMyCars}>
          <Ionicons
            name="ios-car-sport"
            color={theme.colors.shape}
            size={32}
          />
        </S.MyCarsButton>
      </S.MyCarsButtonWrapper>
    </S.Container>
  );
}