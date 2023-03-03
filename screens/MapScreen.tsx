import { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';

import {  View } from '../components/Themed';

export default function MapScreen() {

 


  const lista = [ {lat: -22.913947865776727,long: -47.068129919628475,nome:'senai'}, 
    {lat:-22.86336876561494, long: -47.21348983091278,nome:'shopping hortolândia'},
    {lat:-22.892263725154884,long: -47.02742494440435,nome:'shopping iguatemi'},
     {lat:-22.847232240041055, long:-47.0628527174211,nome:'shopping dom pedro'},
    {lat:-22.925073512554206, long:-47.12749971741982,nome:'shopping bandeiras'
  }]

  
  return (
    <View style={styles.container}>
        
     <MapView style={styles.map}
      initialRegion={{
        latitude:-22.913947865776727 ,
        longitude: -47.068129919628475,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    }}
  >
    
    {lista.map((item) => (
    <Marker key={item.nome} coordinate={{ latitude : item.lat , longitude :item.long }}>
      <Callout>
        <Text>{item.nome}</Text>
      </Callout>
    </Marker>
    ))}

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
