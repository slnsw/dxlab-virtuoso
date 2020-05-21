import dynamic from 'next/dynamic';

const DiaryFilesMap = dynamic(() => import('./DiaryFilesMap'), {
  ssr: false,
});

export default DiaryFilesMap;

// TODO: Attempt at getting SSR and React Leaflet to work together

// export const Circle = dynamic(() => import('react-leaflet/lib/Circle'), {
//   ssr: false,
// });

// export const FeatureGroup = dynamic(
//   () => import('react-leaflet/lib/FeatureGroup'),
//   {
//     ssr: false,
//   },
// );

// export const Marker = dynamic(() => import('react-leaflet/lib/Marker'), {
//   ssr: false,
// });

// export const Popup = dynamic(() => import('react-leaflet/lib/Popup'), {
//   ssr: false,
// });
