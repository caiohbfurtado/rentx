import React, { useState, useRef} from 'react';
import { FlatList, ViewToken } from 'react-native';

import * as S from './styles';

type Props = {
  imagesUrl: string[];
}

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props){
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <S.Container>
      <S.ImageIndexes>
        {
          imagesUrl.map((_, index) => (
            <S.ImageIndex 
              active={imageIndex === index}
              key={String(index)}
            />
          ))
        }
      </S.ImageIndexes>

      <FlatList 
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <S.CarImageWrapper>
            <S.CarImage 
              source={{ uri: item }}
              resizeMode="contain"
            />
          </S.CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </S.Container>
  );
}