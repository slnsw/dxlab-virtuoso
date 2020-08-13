import React from 'react';
import Head from 'next/head';

import WebsiteApp from '../components/WebsiteApp';
import Select from '../components/Select';
import CTAButton from '../components/CTAButton';
import CTALink from '../components/CTALink';
import Modal from '../components/Modal';
import Overlay from '../components/Overlay';
import Icon from '../components/Icon';
import SearchTextInput from '../components/SearchTextInput/SearchTextInput';

const DesignSystemPage = () => {
  const [isOverlayActive, setIsOverlayActive] = React.useState(false);
  const [isModalActive, setIsModalActive] = React.useState(false);

  return (
    <WebsiteApp>
      <Head>
        <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
      </Head>

      <div
        style={{
          margin: '0 auto',
          maxWidth: 'var(--container-width-md',
        }}
      >
        <h1>Design System</h1>
        <h2>Components</h2>
        <h3>Search Text Input</h3>
        <SearchTextInput />
        <h3>Select</h3>
        <Select
          options={[
            {
              label: 'Roger Federer',
              value: 'federer',
            },
            {
              label: 'Raphael Nadal',
              value: 'nadal',
            },
            {
              label: 'Novak Djokovic',
              value: 'djokovic',
            },
          ]}
        />
        Disabled:
        <Select
          isDisabled={true}
          options={[
            {
              label: 'Roger Federer',
              value: 'federer',
            },
            {
              label: 'Raphael Nadal',
              value: 'nadal',
            },
            {
              label: 'Novak Djokovic',
              value: 'djokovic',
            },
          ]}
        />
        <div
          style={{
            width: '20rem',
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--colour-white)',
          }}
        >
          <Select
            theme="light"
            options={[
              {
                label: 'Roger Federer',
                value: 'federer',
              },
              {
                label: 'Raphael Nadal',
                value: 'nadal',
              },
              {
                label: 'Novak Djokovic',
                value: 'djokovic',
              },
            ]}
          />
          <br />
          <Select
            theme="light"
            isDisabled={true}
            options={[
              {
                label: 'Roger Federer',
                value: 'federer',
              },
              {
                label: 'Raphael Nadal',
                value: 'nadal',
              },
              {
                label: 'Novak Djokovic',
                value: 'djokovic',
              },
            ]}
          />
        </div>
        <h3>CTALink</h3>
        <p>
          <CTALink href="/">Home Page</CTALink>
          <CTALink href="https://sl.nsw.gov.au">SL Home Page</CTALink>
        </p>
        <p>
          <CTALink href="/">Home Page</CTALink>
        </p>
        <p>
          <CTALink href="/" size="sm">
            Small CTALink
          </CTALink>

          <CTALink href="/" variant="secondary" size="sm">
            Secondary Small CTALink
          </CTALink>
        </p>
        <p>
          <CTALink href="/" variant="secondary">
            Secondary CTALink
          </CTALink>
        </p>
        <h3>CTAButton</h3>
        <p>
          <CTAButton>Primary</CTAButton>{' '}
          <CTAButton variant="secondary">Secondary</CTAButton>
        </p>
        <p>
          <CTAButton disabled={true}>Disabled</CTAButton>{' '}
          <CTAButton variant="secondary" disabled={true}>
            Disabled
          </CTAButton>
        </p>
        <p>
          <CTAButton size="sm">Small</CTAButton>{' '}
          <CTAButton size="sm" variant="secondary">
            Small
          </CTAButton>
        </p>
        <div
          style={{
            width: 'fit-content',
            // display: 'inline-block',
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--colour-white)',
          }}
        >
          <p>
            <CTAButton theme="light">Light primary</CTAButton>{' '}
            <CTAButton theme="light" variant="secondary">
              Light secondary
            </CTAButton>
          </p>
          <p>
            <CTAButton theme="light" disabled={true}>
              Light primary
            </CTAButton>{' '}
            <CTAButton theme="light" variant="secondary" disabled={true}>
              Light secondary
            </CTAButton>
          </p>
          <p>
            <CTAButton size="sm" theme="light">
              Light primary
            </CTAButton>{' '}
            <CTAButton size="sm" theme="light" variant="secondary">
              Light secondary
            </CTAButton>
          </p>
        </div>
        <h3>Modal</h3>
        <CTAButton onClick={() => setIsModalActive(true)}>Show modal</CTAButton>
        <Modal isActive={isModalActive} onClose={() => setIsModalActive(false)}>
          Modal Content
        </Modal>
        <h3>Overlay</h3>
        <CTAButton onClick={() => setIsOverlayActive(true)}>
          Show overlay
        </CTAButton>
        <Overlay
          isActive={isOverlayActive}
          onClick={() => setIsOverlayActive(false)}
        />
        <h2>Icons</h2>
        <p>
          Not using <a href="https://ionicons.com/">Ionicons</a> any more. But
          local inline SVGs downloaded from there.
        </p>
        <Icon name="facebook" size="sm" colour="white" />
        <Icon name="reload" size="sm" colour="white" />
        <Icon name="facebook" size="md" colour="grey" />
        <Icon name="facebook" size="lg" colour="white" />
        <Icon name="facebook" size="xlg" colour="grey" />
        <Icon name="facebook" size="xxlg" colour="white" />
        <Icon name="twitter" size="xlg" colour="grey" />
        <Icon name="close" size="xlg" colour="white" />
        <Icon name="close" size="xlg" colour="black" />
      </div>
    </WebsiteApp>
  );
};

export default DesignSystemPage;
