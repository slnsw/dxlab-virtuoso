import { useRouter } from 'next/router';

import '../styles/base.css';
import '../styles/globals.css';

// Pages CSS
import './collection/item/item.css';
import './collection/index.css';
import './collection/search.css';
import './_error.css';
import './blog.css';
import './example-page.css';
import './index.css';
import './post.css';

// Components CSS
import '../components/App/App.css';
import '../components/Button/Button.css';
import '../components/CollectionApp/CollectionApp.css';
import '../components/CollectionItem/CollectionItem.css';
import '../components/CollectionPart/CollectionPart.css';
import '../components/CollectionParts/CollectionParts.css';
import '../components/Comment/Comment.css';
import '../components/CommentForm/CommentForm.css';
import '../components/Comments/Comments.css';
import '../components/DisplayTile/DisplayTile.css';
import '../components/ExampleComponent/ExampleComponent.css';
import '../components/FeaturedTile/FeaturedTile.css';
import '../components/Footer/Footer.css';
import '../components/Header/Header.css';
import '../components/Image/Image.css';
import '../components/Masthead/Masthead.css';
import '../components/Menu/Menu.css';
import '../components/NoImage/NoImage.css';
import '../components/Popover/Popover.css';
import '../components/RelatedCollectionItems/RelatedCollectionItems.css';
import '../components/SearchModal/SearchModal.css';
import '../components/SectionTitle/SectionTitle.css';
import '../components/ShareBox/ShareBox.css';
import '../components/SimpleTile/SimpleTile.css';
import '../components/Table/Table.css';
import '../components/Tile/Tile.css';
import '../components/TileButtonGroup/TileButtonGroup.css';
import '../components/TileImage/TileImage.css';
import '../components/WebsiteApp/WebsiteApp.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <Component router={router} {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
