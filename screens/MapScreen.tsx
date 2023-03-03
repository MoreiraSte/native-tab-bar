import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';

import {  View } from '../components/Themed';

export default function MapScreen() {

  const [latitude,setLatitude] = useState(-22.913947865776727)
  const [longitude,setLongitude] = useState(-47.068129919628475)

  const objetos = [
    {
      coordinate: {
        latitude: -22.916108012868833,
        longitude: 47.068582242488816,
      },
      name: 'Hospital Municipal Dr. Mário Gatti',
    },
    {
      coordinate: {
        latitude: -22.-22.915198859112163,
        longitude: -47.067423528239836,
      },
      name: 'Unidade Pediátrica Mário Gattinho',
    },
    {
      coordinate: {
        latitude: -22.914467578851617,
        longitude: -47.06662959439167,
      },
      name: 'Instituto Amor e Vida',
    },
    {
      coordinate: {
        latitude: -22.913947865776727,
        longitude: -47.068129919628475,
      },
      name: 'Escola e Faculdade de Tecnologia Senai Roberto Mange',
    },
    {
      coordinate: {
        latitude: -22.915080273402552,
        longitude: -47.06863588665613,
      },
      name: 'Teatro SESI Campinas Amoreiras',
    },
  ];

  return (
    <View style={styles.container}>
     <MapView style={styles.map}
      initialRegion={{
        latitude: -22.913947865776727,
        longitude: -47.068129919628475,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    }}

  >
          {objetos.map((item) => (    
        <Marker coordinate={{ latitude : item.coordinate.latitude , longitude : item.coordinate.longitude}}>
          <Callout>
            <Text>
              {item.name}
            </Text>
          </Callout>

        </Marker>
    ))}

{/* teste */}
        

  </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
