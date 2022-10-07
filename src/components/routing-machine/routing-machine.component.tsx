import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';

type RoutingMachineProps = {
    waypoints: [LatLngExpression, LatLngExpression];
}

export default function RoutingMachine({waypoints}: RoutingMachineProps) {
    const map = useMap();
    const [control, setControl] = useState<any>(null);

    useEffect(() => {
        if (!map) {
            return () => undefined;
        }
        if (control) {
            control.setWaypoints(waypoints);
        } else {
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
                createMarker: () => null,
            })
                .addTo(map);
            setControl(control);
        }

        return () => undefined;
    }, [map, waypoints]);

    return <div/>;
}
