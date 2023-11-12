import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

const Map = withScriptjs(withGoogleMap(({ tasks, setTasks }) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 37.7749, lng: -122.4194 }} // Set your default center coordinates
  >
    {tasks.map((task) => (
      <Marker
        key={task.id}
        position={{ lat: task.lat, lng: task.lng }}
        draggable={true}
        onDragEnd={(e) => {
          const updatedTasks = tasks.map((t) =>
            t.id === task.id
              ? { ...t, lat: e.latLng.lat(), lng: e.latLng.lng() }
              : t
          );
          setTasks(updatedTasks);
        }}
      />
    ))}
  </GoogleMap>
)));

export default Map;

  