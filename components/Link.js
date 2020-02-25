import { Link } from '../routes';

export default (props) => {
  let href;

  if (props.as) {
    console.log(props.as.indexOf('/blog/'));

    if (props.as.indexOf('/blog/') >= 0) {
      href = '/blog/[slug]';
    } else if (props.as.indexOf('/collection/item/' >= 0)) {
      href = '/collection/item/[item]';
    }
  }

  return (
    <Link {...props} href={href || props.href}>
      {props.children}
    </Link>
  );
};
