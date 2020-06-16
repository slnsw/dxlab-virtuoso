import React from 'react';

import SheetMusicApp from '../components/SheetMusicApp/SheetMusicApp';

const SheetMusicPage = ({ router }) => {
  const slug = router.query.slug || 'national-song-our-sailor-prince';

  return <SheetMusicApp slug={slug} />;
};

export default SheetMusicPage;
