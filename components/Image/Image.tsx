import React from 'react';
import PropTypes from 'prop-types';

import css from './Image.module.scss';

type Props = {
  src: string;
  alt: string;
  loading?: 'auto' | 'lazy' | 'eager';
  className?: string;
};

const Image: React.FC<Props> = ({
  src,
  alt,
  className,
  loading = 'auto',
  ...restProps
}) => {
  const imageRef = React.useRef(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (imageRef.current.complete) {
      setIsLoaded(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [src]);

  return (
    <img
      src={src}
      alt={alt}
      className={[
        css.image,
        isLoaded ? css.imageIsLoaded : '',
        isLoading ? css.imageIsLoading : '',
        className || '',
      ].join(' ')}
      ref={imageRef}
      // https://css-tricks.com/native-lazy-loading/
      // @ts-ignore
      loading={loading}
      onLoad={() => {
        setIsLoaded(true);
        setIsLoading(false);
      }}
      {...restProps}
    />
  );
};

Image.propTypes = {
  className: PropTypes.string,
};

export default Image;
