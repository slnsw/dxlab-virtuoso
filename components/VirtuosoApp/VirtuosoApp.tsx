import React from 'react';
// import { useRouter } from 'next/router';

import App from '../App';
import Link from '../Link';
// import HeaderNavV2 from '../HeaderNavV2';
// import Progress from '../Progress';
// import Menu from '../Menu';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
// import MenuIconButton from '../MenuIconButton';
import Footer from '../Footer';
import { VirtuosoThinLogo } from './VirtuosoLogo';
// import VirtuosoVertDivider from './VirtuosoVertDivider';
// import VirtuosoLeafDivider from './VirtuosoLeafDivider';
// import VirtuosoRibbonDivider from './VirtuosoRibbonDivider';

// import { useLockBodyScroll } from '../../lib/hooks/use-lock-body-scroll';

import css from './VirtuosoApp.module.scss';

type Props = {
  title: string;
  className?: string;
  metaDescription?: string;
  metaImageUrl?: string;
  metaImageWidth?: number;
  metaImageHeight?: number;
  children: React.ReactNode;
};

const VirtuosoApp: React.FC<Props> = ({
  title,
  metaDescription,
  metaImageUrl,
  metaImageWidth,
  metaImageHeight,
  className,
  children,
}) => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  // const router = useRouter();

  // useLockBodyScroll(isMobileMenuOpen);

  return (
    <App
      title={`${title} - Virtuoso`}
      className={[css.sheetMusicApp, className || ''].join(' ')}
      metaDescription={metaDescription}
      metaImageUrl={metaImageUrl}
      metaImageWidth={metaImageWidth}
      metaImageHeight={metaImageHeight}
    >
      <header className={css.header}>
        <DXLabLogo className={css.dxlabLogo} />

        <span className={css.headerDivider}></span>

        <Link href="/virtuoso">
          <a className={css.virtuosoLogo}>
            <VirtuosoThinLogo />
          </a>
        </Link>

        {/* No need for Mobile Menu yet as site is still very small */}
        {/* <HeaderNavV2 isOpen={isMobileMenuOpen}>
          <div className={css.headerNavInside}>
            <VirtuosoVertDivider />
            <VirtuosoRibbonDivider />
            <Menu
              className={css.menu}
              menuItemClassName={css.menuItem}
              menuItems={[
                {
                  name: 'Home',
                  url: '/virtuoso',
                  isActive: false,
                  ariaLabel: 'Home',
                },
                {
                  name: 'About',
                  url: '/virtuoso/about',
                  isActive: false,
                  ariaLabel: 'About',
                },
              ]}
              pathname={router.pathname}
              onMenuItemClick={() => setIsMobileMenuOpen(false)}
            />
            <VirtuosoLeafDivider />
          </div>
        </HeaderNavV2>

        <MenuIconButton
          isOpen={isMobileMenuOpen}
          className={css.menuIconButton}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        /> */}

        <SLNSWLogo className={css.slnswLogo} />
      </header>

      {/* <Progress /> */}

      <div className={css.content}>{children}</div>

      <Footer />
    </App>
  );
};

export default VirtuosoApp;
