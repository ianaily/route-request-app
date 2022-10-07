import React from 'react';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';

import RoutingMachine from 'src/components/routing-machine/routing-machine.component';
import { MapProps } from './map.types';
import './map.style.css';

export default function Map({
                                loadingPoint,
                                unloadingPoint,
                                defaultPosition,
                            }: MapProps) {
    const loadingIcon = L.icon({
        iconUrl: 'marker-a.png',
        iconSize: [30, 46],
        iconAnchor: [15, 44],
    });

    const unloadingIcon = L.icon({
        iconUrl: 'marker-b.png',
        iconSize: [30, 46],
        iconAnchor: [15, 44],
    });

    return (
        <MapContainer
            center={defaultPosition}
            zoom={12}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                loadingPoint && unloadingPoint ?
                    <>
                        <Marker position={loadingPoint} icon={loadingIcon}/>
                        <Marker position={unloadingPoint} icon={unloadingIcon}/>
                        <RoutingMachine waypoints={[loadingPoint, unloadingPoint]}/>
                    </> : null
            }
        </MapContainer>
    );
}
