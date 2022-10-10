import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { LatLngExpression } from 'leaflet';

import { RouteRequest } from 'src/domains/route-request.interface';
import PointSelect from 'src/components/point-select/point-select.component';
import {
    getRoutesRequestAction,
    setCurrentRouteAction,
    updateRouteRequestAction
} from 'src/store/store.actions';
import { RoutesRequestState } from 'src/store/store.types';
import './routes-table.style.css';

export default function RoutesTable({routes, points}: RoutesRequestState) {
    const [currentRoute, setCurrentRoute] = useState<RouteRequest | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoutesRequestAction());
    }, []);

    const onSelectLoadingPointChange = (route: RouteRequest, newPoint: LatLngExpression) => {
        const newRoute = {...route};

        newRoute.loadingPoint = newPoint;
        dispatch(updateRouteRequestAction(newRoute));
    }
    const onSelectUnloadingPointChange = (route: RouteRequest, newPoint: LatLngExpression) => {
        const newRoute = {...route};

        newRoute.unloadingPoint = newPoint;
        dispatch(updateRouteRequestAction(newRoute));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: 'Loading point',
            dataIndex: 'loadingPoint',
            key: 'loadingPoint',
            render: (point: LatLngExpression, route: RouteRequest) =>
                <PointSelect point={point}
                             points={points}
                             onChange={(newPoint) => onSelectLoadingPointChange(route, newPoint)} />
        }, {
            title: 'Unloading point',
            dataIndex: 'unloadingPoint',
            key: 'unloadingPoint',
            render: (point: LatLngExpression, route: RouteRequest) =>
                <PointSelect point={point}
                             points={points}
                             onChange={(newPoint) => onSelectUnloadingPointChange(route, newPoint)} />
        },
    ];

    const onRowClick = (record: RouteRequest) => {
        return {
            'onClick'() {
                setCurrentRoute(record);
                dispatch(setCurrentRouteAction(record));
            }
        };
    };

    return <Table dataSource={routes}
                  columns={columns}
                  rowKey="id"
                  rowClassName={(record) => currentRoute?.id === record.id ? 'selected-row' : ''}
                  onRow={onRowClick}/>
};
