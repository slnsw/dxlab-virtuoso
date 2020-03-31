import { Link } from '../routes';

export default (props) => {
  let href;

  if (props.as) {
    if (props.as.indexOf('/blog/') >= 0) {
      href = '/blog/[slug]';
    } else if (props.as.indexOf('/collection/item/') >= 0) {
      href = '/collection/item/[item]';
    } else if (props.as.indexOf('/sheet-music/song/') >= 0) {
      href = '/sheet-music/song/[slug]';
    } else {
      href = props.as;
    }
  }

  return (
    <Link {...props} href={href || props.href}>
      {props.children}
    </Link>
  );
};
