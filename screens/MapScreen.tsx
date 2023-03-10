import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, LatLng, MapMarkerProps, MarkerPressEvent} from 'react-native-maps';
import Dialog from 'react-native-dialog'

import {  View } from '../components/Themed';

export default function MapScreen() {

  let coord : LatLng = {latitude:0,longitude:0};
  const [coordenadas,setCoordenadas] = useState(coord);
  const [visible,setVisible] = useState(false);
  const [nome, setNome] = useState('')

  const [lista ,setLista] = useState(
    [ {lat: -22.913947865776727,long: -47.068129919628475,nome:'senai'}, 
    {lat:-22.86336876561494, long: -47.21348983091278,nome:'shopping hortolândia'},
    {lat:-22.892263725154884,long: -47.02742494440435,nome:'shopping iguatemi'},
     {lat:-22.847232240041055, long:-47.0628527174211,nome:'shopping dom pedro'},
    {lat:-22.925073512554206, long:-47.12749971741982,nome:'shopping bandeiras'
  }]
  )


  const addMarcador = (e:LatLng)=> {
    setCoordenadas(e)
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false);
  };

  const deletarMarcador = (e :MarkerPressEvent) =>{

    let novaLista = [...lista as any]
    let posicaoItem = novaLista.findIndex(x => x.lat == e.nativeEvent.coordinate.latitude && x.long == e.nativeEvent.coordinate.longitude)

    novaLista.splice(posicaoItem,1 )

    setLista(novaLista)


  }

  
  const handleOK = () => {
    let novaLista = [...lista as any]
    novaLista.push({
      lat:coordenadas.latitude,
      long:coordenadas.longitude,
      nome:nome
    })
    setLista(novaLista)
    setVisible(false)
  }

  

  
  return (
    <View style={styles.container}>
       
     <MapView style={styles.map} 
      initialRegion={{
        latitude:-22.913947865776727 ,
        longitude: -47.068129919628475,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    }}
    onPress = {e => addMarcador(e.nativeEvent.coordinate)}

  >

    {lista.map((item) => (
    <Marker key={item.nome} coordinate={{ latitude : item.lat , longitude :item.long }}
      onPress={e => deletarMarcador(e)}
    >
      <Callout>
        <Text>{item.nome}</Text>
      </Callout>
    </Marker>
    ))}

</MapView>

      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Inserir marcador</Dialog.Title>
          <Dialog.Description>
            Informe abaixo o nome deste marcador
          </Dialog.Description>
          <Dialog.Input onChange={(e) => setNome(e.nativeEvent.text)}/>
          <Dialog.Button onPress={() => handleCancel()}label="Cancel"/>
          <Dialog.Button onPress={() => handleOK()}label="Adicionar"/>

        </Dialog.Container>
      </View>
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
