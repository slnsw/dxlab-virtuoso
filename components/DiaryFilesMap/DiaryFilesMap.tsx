import React from 'react';
import { Map, TileLayer, FeatureGroup, Circle, Popup } from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';

import css from './DiaryFilesMap.module.scss';

type Props = {
  center?: number[];
  zoom?: number;
  data?: any[];
  className?: string;
  // children?: React.ReactNode;
};

const DiaryFilesMap: React.FC<Props> = ({
  center,
  zoom,
  data = [],
  className,
}) => {
  return (
    <Map
      center={center}
      zoom={zoom}
      className={[css.diaryFilesMap, className || ''].join(' ')}
    >
      <FullscreenControl position="topleft" />
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {data.map((s) => {
        return (
          s.lat &&
          s.long && (
            // <Marker position={[s.lat, s.long]} key={`${s.name} ${s.item}`}>
            <FeatureGroup
              color="var(--colour-primary)"
              key={`${s.name} ${s.item}`}
            >
              <Circle center={[s.lat, s.long]} radius={s.count * 80 + 60}>
                <Popup>
                  <a href={`/diary-files/search?q=${s.item}`}>
                    {`${s.name} ${s.item}`}
                  </a>{' '}
                  <br /> {s.count} entr
                  {s.count === 1 ? 'y' : 'ies'}
                </Popup>
              </Circle>
            </FeatureGroup>
            // </Marker>
          )
        );
      })}
    </Map>
  );
};

export default DiaryFilesMap;

export { Marker, Popup, Circle, FeatureGroup } from 'react-leaflet';
