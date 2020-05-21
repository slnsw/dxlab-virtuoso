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

function getCircleWeight(zoom) {
  if (zoom <= 5) {
    return 7;
  }

  if (zoom >= 15) {
    return 4;
  }

  return (19 - zoom) / 3;
}

const DiaryFilesMap: React.FC<Props> = ({
  center,
  zoom = 11,
  data = [],
  className,
}) => {
  const [viewportZoom, setViewportZoom] = React.useState(zoom);
  const circleWeight = getCircleWeight(viewportZoom);

  return (
    <Map
      center={center}
      zoom={zoom}
      className={[css.diaryFilesMap, className || ''].join(' ')}
      onViewportChange={({ zoom: z }) => {
        setViewportZoom(z);
      }}
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
              <Circle
                center={[s.lat, s.long]}
                radius={s.count * 80 + 60}
                weight={circleWeight}
              >
                <Popup className={css.popup}>
                  <p>
                    <a href={`/diary-files/search?q=${s.item}`}>
                      {`${s.name} ${s.item}`}
                    </a>
                  </p>
                  <p>
                    {s.count} entr
                    {s.count === 1 ? 'y' : 'ies'}
                  </p>
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
