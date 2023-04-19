import React from "react";
import { styles } from "./MapScreen.styles";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";

export default MapScreen = ({ route }) => {
  const { title } = route.params.item;
  const { latitude, longitude } = route.params.item.coords;
  console.log(route.params.item);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={`Тут зроблене фото '${title}'`}
        />
      </MapView>
    </View>
  );
};
