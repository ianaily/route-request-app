import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Select, Table } from 'antd';
import { LatLngExpression } from 'leaflet';

import { RouteRequest } from 'src/domains/route-request.interface';
import {
    getRoutesRequestAction,
    setCurrentRouteAction,
    updateRouteRequestAction
} from 'src/store/store.actions';
import { RoutesRequestState } from 'src/store/store.types';
import './routes-table.style.css';

const {Option} = Select;

export default function RoutesTable({routes, points}: RoutesRequestState) {
    const [currentRoute, setCurrentRoute] = useState<RouteRequest | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoutesRequestAction());
    }, []);

    const onSelectLoadingPointChange = (route: RouteRequest, stringedPoint: string) => {
        const newPoint = stringedPoint
            .split(',')
            .map(coordinate => +coordinate);
        const newRoute = {...route};

        newRoute.loadingPoint = newPoint as LatLngExpression;
        dispatch(updateRouteRequestAction(newRoute));
    }
    const onSelectUnloadingPointChange = (route: RouteRequest, stringedPoint: string) => {
        const newPoint = stringedPoint
            .split(',')
            .map(coordinate => +coordinate);
        const newRoute = {...route};

        newRoute.unloadingPoint = newPoint as LatLngExpression;
        dispatch(updateRouteRequestAction(newRoute));
    }
    const renderPointsOptions = () => points.map((point: LatLngExpression, index: number) =>
        <Option key={index} value={point.toString()}>{point.toString()}</Option>
    );
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
                <Select defaultValue={point.toString()}
                        style={{minWidth: 108}}
                        onChange={(value: string) => onSelectLoadingPointChange(route, value)}>
                    {renderPointsOptions()}
                </Select>
        }, {
            title: 'Unloading point',
            dataIndex: 'unloadingPoint',
            key: 'unloadingPoint',
            render: (point: LatLngExpression, route: RouteRequest) =>
                <Select defaultValue={point.toString()}
                        style={{minWidth: 108}}
                        onChange={(value: string) => onSelectUnloadingPointChange(route, value)}>
                    {renderPointsOptions()}
                </Select>
        },
    ];

    const onRowClick = (record: RouteRequest) => {
        return {
            onClick() {
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
