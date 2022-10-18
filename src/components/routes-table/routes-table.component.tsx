import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { LatLngExpression } from 'leaflet';

import { RouteRequest } from 'src/domains/route-request.interface';
import {
  getRoutesRequestAction,
  setCurrentRouteAction,
  updateRouteRequestAction
} from 'src/store/store.actions';
import { RoutesRequestState } from 'src/store/store.types';
import PointSelect from './point-select/point-select.component';
import './routes-table.style.css';

export default function RoutesTable({routes, points}: RoutesRequestState) {
  const [currentRoute, setCurrentRoute] = useState<RouteRequest | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoutesRequestAction());
  }, []);

  const onSelectLoadingPointChange = useCallback((route: RouteRequest, newPoint: LatLngExpression) => {
    const newRoute = {...route};

    newRoute.loadingPoint = newPoint;
    dispatch(updateRouteRequestAction(newRoute));
  }, []);

  const onSelectUnloadingPointChange = useCallback((route: RouteRequest, newPoint: LatLngExpression) => {
    const newRoute = {...route};

    newRoute.unloadingPoint = newPoint;
    dispatch(updateRouteRequestAction(newRoute));
  }, []);

  const columns = useMemo(() => [
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
                     onChange={(newPoint) => onSelectLoadingPointChange(route, newPoint)}/>
    }, {
      title: 'Unloading point',
      dataIndex: 'unloadingPoint',
      key: 'unloadingPoint',
      render: (point: LatLngExpression, route: RouteRequest) =>
        <PointSelect point={point}
                     points={points}
                     onChange={(newPoint) => onSelectUnloadingPointChange(route, newPoint)}/>
    },
  ], [points]);

  const onRowClick = useCallback((record: RouteRequest) => ({
    'onClick'() {
      setCurrentRoute(record);
      dispatch(setCurrentRouteAction(record));
    }
  }), []);

  const selectedRowClass = (record: RouteRequest) => (
    currentRoute?.id === record.id ? 'selected-row' : ''
  );

  return <Table dataSource={routes}
                columns={columns}
                rowKey="id"
                rowClassName={selectedRowClass}
                onRow={onRowClick}/>
};
