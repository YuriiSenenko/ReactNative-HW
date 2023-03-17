import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Image, Text } from "react-native";
import { colors } from "../../styles/colors";
const { iconCameraColor } = colors;

export default MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.item.coords;

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
        <Marker coordinate={{ latitude, longitude }} title="My photo" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: iconCameraColor,
  },
  mapView: {
    flex: 1,
  },
});
