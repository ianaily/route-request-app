import { memo, useEffect, useLayoutEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';

type RoutingMachineProps = {
  waypoints: [LatLngExpression, LatLngExpression];
}

const RoutingMachine = memo(({waypoints}: RoutingMachineProps) => {
  const map = useMap();
  const [control, setControl] = useState<any>(null);

  useLayoutEffect(() => {
    // @ts-ignore
    const control = L.Routing.control({
      waypoints,
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [
          {
            color: 'blue',
            opacity: '0.7',
            weight: 2
          }
        ]
      },
      'createMarker': () => null,
    })
      .addTo(map);
    setControl(control);

    return () => undefined;
  }, [map]);

  useEffect(() => {
    control?.setWaypoints(waypoints);
  }, [waypoints, control]);

  return <div/>;
});

export default RoutingMachine;
