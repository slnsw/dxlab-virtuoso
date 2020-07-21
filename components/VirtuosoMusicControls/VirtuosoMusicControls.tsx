import React from 'react';
import { Range } from 'react-range';

import Select from '../Select/Select';
import CTAButton from '../CTAButton';
import Icon from '../Icon/Icon';

import css from './VirtuosoMusicControls.module.scss';

type Props = {
  className?: string;
  // currentSong: any;
  instruments?: {
    name: string;
    volume: number;
    type: string;
  }[];
  samples: any;
  instrumentTypes: any;
  // setInstrumentTypes: Function;
  tempo: number;
  instrumentVolumes: any;
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
};

const VirtuosoMusicControls: React.FC<Props> = ({
  className,
  instruments = [],
  samples,
  instrumentTypes,
  tempo,
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
}) => {
  const [tempoFieldValue, setTempoFieldValue] = React.useState(tempo);
  const [showMoreControls, setShowMoreControls] = React.useState(true);

  const handleTempoChangeUp = () => {
    const newTempo = tempo < 500 ? tempo + 1 : tempo;
    onTempoChange(newTempo);
    setTempoFieldValue(newTempo);
  };

  const handleTempoChangeDown = () => {
    const newTempo = tempo > 9 ? tempo - 1 : tempo;
    onTempoChange(newTempo);
    setTempoFieldValue(newTempo);
  };

  const handleTempoChange = (e) => {
    // const newTempo = e.target.value ? Number.parseInt(e.target.value, 10) : '';

    setTempoFieldValue(e.target.value);
  };

  const handleTempoExit = () => {
    let newTempo =
      typeof tempoFieldValue === 'string'
        ? Number.parseInt(tempoFieldValue, 10) || 1
        : tempoFieldValue;

    if (newTempo > 200) {
      newTempo = 200;
    }

    if (newTempo < 10) {
      newTempo = 10;
    }

    onTempoChange(newTempo);
    setTempoFieldValue(newTempo);

    // event.preventDefault();
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
        // console.log(samplesStatus);
        return instrumentIndex === i ? option.value : type;
      }),
    );
  };

  // const handleInstrumentLoad = (instrumentIndex) =>
  //   setSamplesStatus((prevSamplesStatus) => {
  //     return prevSamplesStatus.map((status, i) => {
  //       if (i === instrumentIndex) {
  //         return 'loaded';
  //       }

  //       return status;
  //     });
  //   });

  const handlePlayClick = () => {
    // Either way toggle play status
    onPlayClick(!isPlaying);
  };

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
        onClick={handleSkipBackClick}
        theme="light"
        disabled={!isSamplesLoaded || isAtStart}
      >
        <Icon name="play-skip-back" />
      </CTAButton>
      &nbsp;
      <CTAButton
        onClick={handlePlayClick}
        theme="light"
        disabled={!isSamplesLoaded}
      >
        {!isSamplesLoaded ? (
          'Loading'
        ) : (
          <>
            {isPlaying ? (
              <>
                <Icon name="stop" /> Stop
              </>
            ) : (
              <>
                <Icon name="play" /> Play
              </>
            )}
          </>
        )}
      </CTAButton>
      &nbsp;
      <CTAButton
        theme="light"
        onClick={handleAutoScrollClick}
        // disabled={isPlaying}
      >
        Auto scroll: {isAutoScroll ? 'on' : 'off'}
      </CTAButton>
      <form onSubmit={handleFormSubmit} className={css.tempoControls}>
        <label>Tempo:</label>

        <CTAButton
          theme="light"
          className={css['button--tempo']}
          onClick={handleTempoChangeDown}
          disabled={isPlaying}
        >
          <Icon name="remove" />
        </CTAButton>
        <input
          type="number"
          value={tempoFieldValue}
          className={css['tempoInput']}
          min={10}
          max={200}
          onChange={handleTempoChange}
          onBlur={handleTempoExit}
        />
        <CTAButton
          theme="light"
          className={css['button--tempo']}
          onClick={handleTempoChangeUp}
          disabled={isPlaying}
        >
          <Icon name="add" />
        </CTAButton>
      </form>
      <CTAButton
        onClick={handleShowMoreControlsClick}
        theme="light"
        className={css['button--light']}
      >
        {showMoreControls ? 'Hide' : 'More'}
      </CTAButton>
      {showMoreControls && (
        <div className={css.instrumentControls}>
          {instruments.map((instrument, i) => {
            const sampleOptions = Object.entries(samples).map(([key]) => {
              return {
                label: key,
                value: key,
              };
            });

            // console.log(instrumentVolumes[i]);

            return (
              <div className={css.instrumentControlGroup} key={i}>
                <p className={css.instrumentName}>{instrument.name}</p>

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
                        className={css.volumeSlider}
                        id={`volume${i}`}
                        // name={i}
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: '#ccc',
                          // marginTop: '1.2rem',
                          // marginBottom: '1.6rem',
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
                          height: '40px',
                          width: '16px',
                          backgroundColor: 'white',
                          border: '1px solid black',
                        }}
                      />
                    )}
                  />
                </div>
                {/* <span className={css['dB-level']}>
                    {instrumentVolumes[i]} dB
                  </span> */}

                <div className={css.instrumentSelectGroup}>
                  <label htmlFor={`instrument${i}`}>instrument</label>
                  <Select
                    className={css.instrumentSelect}
                    variant="light"
                    value={{
                      value: instrumentTypes[i],
                      label: instrumentTypes[i],
                      // value: instrument.type,
                      // label: instrument.type,
                    }}
                    // menuIsOpen={true}
                    options={sampleOptions}
                    onChange={(option) => handleInstrumentTypeChange(option, i)}
                    isDisabled={isPlaying} // why u no work?
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default VirtuosoMusicControls;
