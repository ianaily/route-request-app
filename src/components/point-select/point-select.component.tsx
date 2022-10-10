import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'antd';
import { LatLngExpression } from 'leaflet';

import { getPointsAction } from 'src/store/store.actions';
import { PointsState } from 'src/store/store.types';

const {Option} = Select;

type OnChangePointSelect = (point: LatLngExpression) => void;

export type PointSelectProps = {
    point: LatLngExpression;
    onChange: OnChangePointSelect;
} & PointsState;

export default function PointSelect({point, points, onChange}: PointSelectProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPointsAction());
    }, []);

    const onSelectChange = (stringedPoint: string) => {
        const newPoint = stringedPoint
            .split(',')
            .map(coordinate => +coordinate) as LatLngExpression;

        onChange(newPoint);
    }

    return (
        <Select defaultValue={point.toString()}
                onChange={onSelectChange}
                style={{minWidth: 108}}>
            {
                points.map((point: LatLngExpression, index: number) =>
                    <Option key={index} value={point.toString()}>{point.toString()}</Option>
                )
            }
        </Select>
    );
}
