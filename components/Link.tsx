import RouteLink from 'next/link';

const Link = (props) => {
  let href;

  if (props.as) {
    if (props.as.indexOf('/blog/') >= 0) {
      href = '/blog/[slug]';
    } else if (props.as.indexOf('/collection/item/') >= 0) {
      href = '/collection/item/[item]';
    } else if (props.as.indexOf('/diary-files/entry') >= 0) {
      href = '/diary-files/entry/[id]';
    } else if (props.as.indexOf('/diary-files/related') >= 0) {
      href = '/diary-files/related/[id]';
    } else if (props.as.indexOf('/virtuoso/song') >= 0) {
      href = '/virtuoso/song/[slug]';
    } else {
      href = props.as;
    }
  }

  return (
    <RouteLink {...props} href={href || props.href}>
      {props.children}
    </RouteLink>
  );
};

export default Link;
