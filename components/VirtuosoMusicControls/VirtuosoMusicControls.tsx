import React from 'react';
import { Range } from 'react-range';

import Select from '../Select/Select';
import CTAButton from '../CTAButton';
import Icon from '../Icon/Icon';

import samples from '../VirtuosoApp/samples';

import css from './VirtuosoMusicControls.module.scss';

type Props = {
  className?: string;
  instruments?: {
    name: string;
    volume: number;
    type: string;
    clef: 'treble' | 'bass';
  }[];
  tempo: number;
  songKey: string;
  instrumentTypes: string[];
  instrumentVolumes: number[];
  isPlaying: boolean;
  isAtStart: boolean;
  isSamplesLoaded: boolean;
  isAutoScroll: boolean;
  onPlayClick: Function;
  onTempoChange: Function;
  onSkipBackClick: Function;
  onAutoScrollClick: Function;
  onInstrumentVolumeChange: Function;
  onInstrumentTypeChange: Function;
  onKeyClick: Function;
};

const sampleOptions = Object.entries(samples).map(([key]) => {
  return {
    label: key,
    value: key,
  };
});

const instrumentOptions = [
  ...sampleOptions,
  {
    label: 'synth',
    value: 'synth',
  },
];

const VirtuosoMusicControls: React.FC<Props> = ({
  className,
  instruments = [],
  tempo,
  songKey,
  instrumentTypes,
  instrumentVolumes,
  isPlaying,
  isAtStart,
  isSamplesLoaded,
  isAutoScroll,
  onPlayClick,
  onTempoChange,
  onSkipBackClick,
  onAutoScrollClick,
  onInstrumentVolumeChange,
  onInstrumentTypeChange,
  onKeyClick,
}) => {
  const [tempoFieldValue, setTempoFieldValue] = React.useState(tempo);
  const [showMoreControls, setShowMoreControls] = React.useState(false);

  const handleTempoChangeUp = () => {
    const newTempo = tempo < 200 ? tempo + 1 : tempo;
    onTempoChange(newTempo);
    setTempoFieldValue(newTempo);
  };

  const handleTempoChangeDown = () => {
    const newTempo = tempo > 10 ? tempo - 1 : tempo;
    onTempoChange(newTempo);
    setTempoFieldValue(newTempo);
  };

  const handleTempoChange = (e) => {
    setTempoFieldValue(e.target.value);
  };

  const handleTempoExit = (e) => {
    let newTempo = e.target.value ? Number.parseInt(e.target.value, 10) : '';

    if (newTempo > 200) {
      newTempo = 200;
    }

    if (newTempo < 10) {
      newTempo = 10;
    }

    onTempoChange(newTempo);
    setTempoFieldValue(newTempo);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleInstrumentVolumeChange = (vol, i) => {
    onInstrumentVolumeChange(
      instrumentVolumes.map((v, index) => {
        return i === index // parseInt(event.target.name, 10)
          ? parseFloat(vol)
          : v;
      }),
    );
  };

  const handleInstrumentTypeChange = (option, i) => {
    onInstrumentTypeChange(
      instrumentTypes.map((type, instrumentIndex) => {
        return instrumentIndex === i ? option.value : type;
      }),
    );
  };

  const handlePlayClick = () => {
    // Either way toggle play status
    onPlayClick(!isPlaying);
  };

  const handlePlayClickCallback = React.useCallback(handlePlayClick, [
    isPlaying,
  ]);

  const handleTempoExitCallback = React.useCallback(handleTempoExit, [
    isPlaying,
  ]);

  React.useEffect(() => {
    const handleSpaceBarPress = (e) => {
      if (e.keyCode === 32) {
        handlePlayClickCallback();
        e.preventDefault();
      }
      if (e.keyCode === 13 && e?.target?.type === 'number') {
        handleTempoExitCallback(e);
        e.stopPropagation();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleSpaceBarPress, false);

    return () => {
      document.removeEventListener('keydown', handleSpaceBarPress, false);
    };
  }, [handlePlayClickCallback, handleTempoExitCallback]);

  const handleSkipBackClick = () => {
    onSkipBackClick();
  };

  const handleAutoScrollClick = () => {
    onAutoScrollClick(!isAutoScroll);
  };

  const handleShowMoreControlsClick = () => {
    setShowMoreControls(!showMoreControls);
  };

  return (
    <div className={[css.virtuosoMusicControls, className || ''].join(' ')}>
      <CTAButton
        theme="light"
        variant="secondary"
        disabled={!isSamplesLoaded || isAtStart}
        // size="sm"
        className={css.button}
        aria-label="Skip back"
        onClick={handleSkipBackClick}
      >
        <Icon name="play-skip-back" size="sm" />
      </CTAButton>
      <CTAButton
        theme="light"
        // variant="secondary"
        className={css.button}
        disabled={!isSamplesLoaded}
        aria-label={isPlaying ? 'Stop' : 'Play'}
        onClick={handlePlayClickCallback}
      >
        {isPlaying ? (
          <>
            <Icon name="stop" />
          </>
        ) : (
          <>
            <Icon name="play" />
          </>
        )}
      </CTAButton>

      <CTAButton
        theme="light"
        variant="secondary"
        className={[css.button, css.autoScrollButton].join(' ')}
        onClick={handleAutoScrollClick}
      >
        Autoscroll {isAutoScroll ? <>on&nbsp;</> : 'off'}
      </CTAButton>

      <TempoControls
        tempo={tempoFieldValue}
        isPlaying={isPlaying}
        className={css.desktopTempoControls}
        onSubmit={handleFormSubmit}
        onChange={handleTempoChange}
        onBlur={handleTempoExit}
        onDownClick={handleTempoChangeDown}
        onUpClick={handleTempoChangeUp}
      />

      <KeyControls
        songKey={songKey}
        className={css.desktopKeyControls}
        onClick={onKeyClick}
        isPlaying={isPlaying}
      />

      {/* <div className={css.keyControls}>
        <label>Key</label>
        <CTAButton
          theme="light"
          disabled={isPlaying}
          className={css.keyButton}
          dangerouslySetInnerHTML={{
            __html:
              songKey.indexOf('b') > -1
                ? `${songKey.replace('b', '<sup>b</sup>')}`
                : songKey,
          }}
          onClick={() => onKeyClick(songKey)}
        ></CTAButton>
      </div> */}

      <CTAButton
        theme="light"
        variant="secondary"
        className={[css.button, css.moreControlsButton].join(' ')}
        onClick={handleShowMoreControlsClick}
      >
        <span>{showMoreControls ? 'Settings' : 'Settings'}</span>

        <Icon
          name={showMoreControls ? 'close' : 'options'}
          style={{
            marginLeft: 'var(--spacing-sm)',
          }}
        />
      </CTAButton>

      <div className={[css.instrumentControlsContainer].join(' ')}>
        <div
          className={[
            css.instrumentControls,
            showMoreControls ? css.instrumentControlsVisible : '',
          ].join(' ')}
          aria-expanded={showMoreControls}
        >
          <div className={css.mobileInstrumentControls}>
            <TempoControls
              tempo={tempo}
              isPlaying={isPlaying}
              className={css.mobileTempoControls}
              onSubmit={handleFormSubmit}
              onChange={handleTempoChange}
              onBlur={handleTempoExit}
              onDownClick={handleTempoChangeDown}
              onUpClick={handleTempoChangeUp}
            />
            <div
              style={{
                borderLeft: '1px solid var(--colour-black)',
              }}
            />
            <KeyControls
              songKey={songKey}
              className={css.mobileKeyControls}
              onClick={onKeyClick}
              isPlaying={isPlaying}
            />
          </div>

          {instruments.map((instrument, i) => {
            return (
              <div className={css.instrumentControlGroup} key={instrument.name}>
                <div className={css.instrumentNameGroup}>
                  <label>Name</label>
                  <div className={css.instrumentName}>
                    {instrument.clef === 'treble' ? (
                      <TrebleClef />
                    ) : (
                      <BassClef />
                    )}
                    <p>{instrument.name}</p>
                  </div>
                </div>

                <div className={css.volumeGroup}>
                  <label htmlFor={`volume${i}`}>
                    volume {instrumentVolumes[i].toFixed(1)} <span>d</span>B
                  </label>
                  <Range
                    key={i}
                    min={-48}
                    max={3}
                    values={[instrumentVolumes[i]]}
                    step={0.5}
                    onChange={(vol) => handleInstrumentVolumeChange(vol, i)}
                    // disabled={isPlaying}
                    renderTrack={({ props, children }) => (
                      <div
                        // className={css.volumeSlider}
                        id={`volume${i}`}
                        // name={i}
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: 'var(--colour-grey-lighter)',
                          marginTop: '1.5rem',
                          marginBottom: '1.2rem',
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '43px',
                          width: '16px',
                          backgroundColor: 'var(--colour-white)',
                          border: '1px solid var(--colour-black)',
                        }}
                      />
                    )}
                  />
                </div>

                <div className={css.instrumentSelectGroup}>
                  <label htmlFor={`instrument${i}`}>instrument</label>
                  <Select
                    // className={css.instrumentSelect}
                    theme="light"
                    value={{
                      value: instrumentTypes[i],
                      label: instrumentTypes[i],
                      // value: instrument.type,
                      // label: instrument.type,
                    }}
                    // menuIsOpen={true}
                    // options={sampleOptions}
                    options={instrumentOptions}
                    onChange={(option) => handleInstrumentTypeChange(option, i)}
                    isDisabled={isPlaying} // why u no work? Works now - but they are all black
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* )} */}
      {/* </div> */}
    </div>
  );
};

const TempoControls = ({
  tempo,
  isPlaying,
  className,
  onSubmit,
  onDownClick,
  onUpClick,
  onChange,
  onBlur,
}) => {
  return (
    <div className={[css.tempoControls, className || ''].join(' ')}>
      <label>Tempo</label>
      <form onSubmit={onSubmit}>
        <CTAButton
          theme="light"
          variant="secondary"
          size="sm"
          disabled={isPlaying}
          className={[css.tempoButton, css.addTempoButton].join(' ')}
          onClick={onDownClick}
        >
          <Icon name="remove" />
        </CTAButton>
        <input
          type="number"
          value={tempo}
          className={css['tempoInput']}
          min={10}
          max={200}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isPlaying}
        />
        <CTAButton
          theme="light"
          variant="secondary"
          disabled={isPlaying}
          size="sm"
          className={[css.tempoButton].join(' ')}
          onClick={onUpClick}
        >
          <Icon name="add" />
        </CTAButton>
      </form>
    </div>
  );
};

const KeyControls = ({ songKey, isPlaying, className, onClick }) => {
  return (
    <div className={[css.keyControls, className || ''].join(' ')}>
      <label>Key</label>
      <CTAButton
        theme="light"
        disabled={isPlaying}
        className={css.keyButton}
        dangerouslySetInnerHTML={{
          __html:
            songKey.indexOf('b') > -1
              ? `${songKey.replace('b', '<sup>b</sup>')}`
              : songKey,
        }}
        onClick={() => onClick(songKey)}
      ></CTAButton>
    </div>
  );
};

const TrebleClef = () => {
  return (
    <svg width={20} height={40} viewBox="111 30 20 60">
      <path
        d="m 121.09625 31.615164821134528c 0.09 -0.09 0.24 -0.06 0.36 0c 0.12 0.09 0.57 0.6 0.96 1.11c 1.77 2.34 3.21 5.85 3.57 8.73c 0.21 1.56 0.03 3.27 -0.45 4.86c -0.69 2.31 -1.92 4.47 -4.23 7.44c -0.3 0.39 -0.57 0.72 -0.6 0.75c -0.03 0.06 0 0.15 0.18 0.78c 0.54 1.68 1.38 4.44 1.68 5.49l 0.09 0.42l 0.39 0c 1.47 0.09 2.76 0.51 3.96 1.29c 1.83 1.23 3.06 3.21 3.39 5.52c 0.09 0.45 0.12 1.29 0.06 1.74c -0.09 1.02 -0.33 1.83 -0.75 2.73c -0.84 1.71 -2.28 3.06 -4.02 3.72l -0.33 0.12l 0.03 1.26c 0 1.74 -0.06 3.63 -0.21 4.62c -0.45 3.06 -2.19 5.49 -4.47 6.21c -0.57 0.18 -0.9 0.21 -1.59 0.21c -0.69 0 -1.02 -0.03 -1.65 -0.21c -1.14 -0.27 -2.13 -0.84 -2.94 -1.65c -0.99 -0.99 -1.56 -2.16 -1.71 -3.54c -0.09 -0.81 0.06 -1.53 0.45 -2.13c 0.63 -0.99 1.83 -1.56 3 -1.53c 1.5 0.09 2.64 1.32 2.73 2.94c 0.06 1.47 -0.93 2.7 -2.37 2.97c -0.45 0.06 -0.84 0.03 -1.29 -0.09l -0.21 -0.09l 0.09 0.12c 0.39 0.54 0.78 0.93 1.32 1.26c 1.35 0.87 3.06 1.02 4.35 0.36c 1.44 -0.72 2.52 -2.28 2.97 -4.35c 0.15 -0.66 0.24 -1.5 0.3 -3.03c 0.03 -0.84 0.03 -2.94 0 -3c -0.03 0 -0.18 0 -0.36 0.03c -0.66 0.12 -0.99 0.12 -1.83 0.12c -1.05 0 -1.71 -0.06 -2.61 -0.3c -4.02 -0.99 -7.11 -4.35 -7.8 -8.46c -0.12 -0.66 -0.12 -0.99 -0.12 -1.83c 0 -0.84 0 -1.14 0.15 -1.92c 0.36 -2.28 1.41 -4.62 3.3 -7.29l 2.79 -3.6c 0.54 -0.66 0.96 -1.2 0.96 -1.23c 0 -0.03 -0.09 -0.33 -0.18 -0.69c -0.96 -3.21 -1.41 -5.28 -1.59 -7.68c -0.12 -1.38 -0.15 -3.09 -0.06 -3.96c 0.33 -2.67 1.38 -5.07 3.12 -7.08c 0.36 -0.42 0.99 -1.05 1.17 -1.14zm 2.01 4.71c -0.15 -0.3 -0.3 -0.54 -0.3 -0.54c -0.03 0 -0.18 0.09 -0.3 0.21c -2.4 1.74 -3.87 4.2 -4.26 7.11c -0.06 0.54 -0.06 1.41 -0.03 1.89c 0.09 1.29 0.48 3.12 1.08 5.22c 0.15 0.42 0.24 0.78 0.24 0.81c 0 0.03 0.84 -1.11 1.23 -1.68c 1.89 -2.73 2.88 -5.07 3.15 -7.53c 0.09 -0.57 0.12 -1.74 0.06 -2.37c -0.09 -1.23 -0.27 -1.92 -0.87 -3.12zm -2.94 20.7c -0.21 -0.72 -0.39 -1.32 -0.42 -1.32c 0 0 -1.2 1.47 -1.86 2.37c -2.79 3.63 -4.02 6.3 -4.35 9.3c -0.03 0.21 -0.03 0.69 -0.03 1.08c 0 0.69 0 0.75 0.06 1.11c 0.12 0.54 0.27 0.99 0.51 1.47c 0.69 1.38 1.83 2.55 3.42 3.42c 0.96 0.54 2.07 0.9 3.21 1.08c 0.78 0.12 2.04 0.12 2.94 -0.03c 0.51 -0.06 0.45 -0.03 0.42 -0.3c -0.24 -3.33 -0.72 -6.33 -1.62 -10.08c -0.09 -0.39 -0.18 -0.75 -0.18 -0.78c -0.03 -0.03 -0.42 0 -0.81 0.09c -0.9 0.18 -1.65 0.57 -2.22 1.14c -0.72 0.72 -1.08 1.65 -1.05 2.64c 0.06 0.96 0.48 1.83 1.23 2.58c 0.36 0.36 0.72 0.63 1.17 0.9c 0.33 0.18 0.36 0.21 0.42 0.33c 0.18 0.42 -0.18 0.9 -0.6 0.87c -0.18 -0.03 -0.84 -0.36 -1.26 -0.63c -0.78 -0.51 -1.38 -1.11 -1.86 -1.83c -1.77 -2.7 -0.99 -6.42 1.71 -8.19c 0.3 -0.21 0.81 -0.48 1.17 -0.63c 0.3 -0.09 1.02 -0.3 1.14 -0.3c 0.06 0 0.09 0 0.09 -0.03c 0.03 -0.03 -0.51 -1.92 -1.23 -4.26zm 3.78 7.41c -0.18 -0.03 -0.36 -0.06 -0.39 -0.06c -0.03 0 0 0.21 0.18 1.02c 0.75 3.18 1.26 6.3 1.5 9.09c 0.06 0.72 0 0.69 0.51 0.42c 0.78 -0.36 1.44 -0.96 1.98 -1.77c 1.08 -1.62 1.2 -3.69 0.3 -5.55c -0.81 -1.62 -2.31 -2.79 -4.08 -3.15z"
        stroke="none"
        fill="#000000"
      ></path>
    </svg>
  );
};

const BassClef = () => {
  return (
    <svg width={20} height={40} viewBox="108 113 25 50">
      <path
        d="m 117.70625 127.27216482113452c 0.36 -0.03 1.65 0 2.13 0.03c 3.6 0.42 6.03 2.1 6.93 4.86c 0.27 0.84 0.36 1.5 0.36 2.58c 0 0.9 -0.03 1.35 -0.18 2.16c -0.78 3.78 -3.54 7.08 -8.37 9.96c -1.74 1.05 -3.87 2.13 -6.18 3.12c -0.39 0.18 -0.75 0.33 -0.81 0.36c -0.06 0.03 -0.15 0.06 -0.18 0.06c -0.15 0 -0.33 -0.18 -0.33 -0.33c 0 -0.15 0.06 -0.21 0.51 -0.48c 3 -1.77 5.13 -3.21 6.84 -4.74c 0.51 -0.45 1.59 -1.5 1.95 -1.95c 1.89 -2.19 2.88 -4.32 3.15 -6.78c 0.06 -0.42 0.06 -1.77 0 -2.19c -0.24 -2.01 -0.93 -3.63 -2.04 -4.71c -0.63 -0.63 -1.29 -1.02 -2.07 -1.2c -1.62 -0.39 -3.36 0.15 -4.56 1.44c -0.54 0.6 -1.05 1.47 -1.32 2.22l -0.09 0.21l 0.24 -0.12c 0.39 -0.21 0.63 -0.24 1.11 -0.24c 0.3 0 0.45 0 0.66 0.06c 1.92 0.48 2.85 2.55 1.95 4.38c -0.45 0.99 -1.41 1.62 -2.46 1.71c -1.47 0.09 -2.91 -0.87 -3.39 -2.25c -0.18 -0.57 -0.21 -1.32 -0.03 -2.28c 0.39 -2.25 1.83 -4.2 3.81 -5.19c 0.69 -0.36 1.59 -0.6 2.37 -0.69zm 11.58 2.52c 0.84 -0.21 1.71 0.3 1.89 1.14c 0.3 1.17 -0.72 2.19 -1.89 1.89c -0.99 -0.21 -1.5 -1.32 -1.02 -2.25c 0.18 -0.39 0.6 -0.69 1.02 -0.78zm 0 7.5c 0.84 -0.21 1.71 0.3 1.89 1.14c 0.21 0.87 -0.3 1.71 -1.14 1.89c -0.87 0.21 -1.71 -0.3 -1.89 -1.14c -0.21 -0.84 0.3 -1.71 1.14 -1.89z"
        stroke="none"
        fill="#000000"
      ></path>
    </svg>
  );
};

export default VirtuosoMusicControls;
