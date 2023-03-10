import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Callout, LatLng, Point, MapMarkerProps, MarkerPressEvent } from 'react-native-maps';
import Dialog from "react-native-dialog";

import { View } from '../components/Themed';
import { Marcador } from '../types';

export default function MapScreen() {
  let coordenadas : LatLng = {latitude: 0, longitude: 0};
  const [coordinates,setCoordinates] = useState(coordenadas)
  const [latitude, setLatitude] = useState(-22.913947865776727)
  const [longitude, setLongitude] = useState(-47.068129919628475)
  const [visible,setVisible] = useState(false)
  const [nome,setNome] = useState('')
  let objeto: Marcador = {
    nome:'',
    latitude:0,
    longitude:0,
    latitudeDelta:0,
    longitudeDelta:0
  }

  const [object, setObject] = useState([objeto])

  const handleClick = (e: LatLng) => {
    setCoordinates(e)
    setVisible(true)
  }

  const handleSalvar=()=>{
    const novaLista = [...object] 
    novaLista.push({
      nome: nome,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    })

    setObject(novaLista)
    setVisible(false)
  }

  const handleDelete = (e:MarkerPressEvent)=>{
    let novaLista = [...object as Marcador[]]
    e.nativeEvent.coordinate.latitude
    let posicaoItem = novaLista.findIndex(x => x.latitude == e.nativeEvent.coordinate.latitude && x.longitude == e.nativeEvent.coordinate.longitude )

    novaLista.splice(posicaoItem,1)
    setObject(novaLista)
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: -22.913947865776727,
          longitude: -47.068129919628475,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,

        }}
        onDoublePress={e => handleClick(e.nativeEvent.coordinate)}

      >

        {object.map((local) => (
          <Marker onPress={(e)=>handleDelete(e)} key={local.latitude} coordinate={{ latitude: local.latitude, longitude: local.longitude }}>
            <Callout>
              <Text>{local.nome}</Text>

            </Callout>
          </Marker>
        )




        )}
        {/* <Marker coordinate={{ latitude : latitude , longitude : longitude }}>
      <Callout>
        <Text>SENAI</Text>
        nome
      </Callout>
    </Marker> */}

      


      </MapView>
      <View>
          <Dialog.Container visible={visible}>
            <Dialog.Title>Account delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this account? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Input onChange={(e)=>{
              setNome(e.nativeEvent.text)
            }}/>
            <Dialog.Button onPress={()=>setVisible(false)} label="cancel" />
            <Dialog.Button onPress={()=>handleSalvar()} label="Salvar" />
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
