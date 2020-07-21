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
  // wasStoppedByVisibilityChange: boolean;
  // setWasStoppedByVisibilityChange: Function;
  // currentBeat: number;
  // isAutoScrollRef: any;
  // totalBeatsInSong: number;
  // setSongPercentage: Function;
  onPlayClick: Function;
  onTempoChange: Function;
  onSkipBackClick: Function;
  onAutoScrollClick: Function;
  // setInstrumentVolumes: Function;
  onInstrumentVolumeChange: Function;
  onInstrumentTypeChange: Function;
};

const VirtuosoMusicControls: React.FC<Props> = ({
  className,
  instruments = [],
  samples,
  instrumentTypes,
  // setInstrumentTypes,
  tempo,
  instrumentVolumes,
  isPlaying,
  isAtStart,
  isSamplesLoaded,
  isAutoScroll,
  // setInstrumentVolumes,
  // wasStoppedByVisibilityChange,
  // setWasStoppedByVisibilityChange,
  // currentBeat,
  // isAutoScrollRef,
  // totalBeatsInSong,
  // setSongPercentage,
  onPlayClick,
  onTempoChange,
  onSkipBackClick,
  onAutoScrollClick,
  onInstrumentVolumeChange,
  onInstrumentTypeChange,
}) => {
  // const [tempoFieldValue, setTempoFieldValue] = React.useState(tempo);
  const [showMoreControls, setShowMoreControls] = React.useState(false);

  const handleTempoChangeUp = () => {
    const newTempo = tempo < 200 ? tempo + 1 : tempo;
    onTempoChange(newTempo);
    // setTempoFieldValue(newTempo);
  };

  const handleTempoChangeDown = () => {
    const newTempo = tempo > 10 ? tempo - 1 : tempo;
    onTempoChange(newTempo);
    // setTempoFieldValue(newTempo);
  };

  const handleTempoChange = (e) => {
    let newTempo = e.target.value ? Number.parseInt(e.target.value, 10) : '';

    if (newTempo > 200) {
      newTempo = 200;
    }

    if (newTempo < 10) {
      newTempo = 10;
    }

    onTempoChange(newTempo);
    // setTempoFieldValue(e.target.value);
  };

  const handleTempoExit = (e) => {
    // let newTempo = Number.parseInt(tempoFieldValue, 10) || 1;
    let newTempo = e.target.value ? Number.parseInt(e.target.value, 10) : '';

    if (newTempo > 200) {
      newTempo = 200;
    }

    if (newTempo < 10) {
      newTempo = 10;
    }

    onTempoChange(newTempo);
    // setTempoFieldValue(newTempo);

    // event.preventDefault();
  };

  const handleFormSubmit = (event) => {
    // handleTempoExit(event);
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

  const handleSpaceBarPress = (e) => {
    if (e.keyCode === 32) {
      handlePlayClick();
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleSpaceBarPress, false);

    return () => {
      document.removeEventListener('keydown', handleSpaceBarPress, false);
    };
  }, [handleSpaceBarPress]);

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
      {/* <div className={css.songControls}> */}
      {/* <CTAButton
          onClick={() => {
            const scrollTo = createWindowScrollTo({
              duration: 500,
            });
            scrollTo.start(500);
          }}
          theme="light"
        >
          Test scroll
        </CTAButton> */}
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
        // className={css['button--light']}
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
      <div className={css.tempoControls}>
        <label>Tempo:</label>
        <CTAButton
          theme="light"
          className={css['button--tempo']}
          onClick={handleTempoChangeDown}
          disabled={isPlaying}
        >
          <Icon name="remove" />
        </CTAButton>
        <form onSubmit={handleFormSubmit}>
          <input
            type="number"
            value={tempo}
            className={css['tempoInput']}
            min={10}
            max={200}
            onChange={handleTempoChange}
            onBlur={handleTempoExit}
          />
        </form>
        <CTAButton
          theme="light"
          className={css['button--tempo']}
          onClick={handleTempoChangeUp}
          disabled={isPlaying}
        >
          <Icon name="add" />
        </CTAButton>
      </div>
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
                <p>{instrument.name}</p>
                <label htmlFor={`volume${i}`}>
                  volume {instrumentVolumes[i].toFixed(1)} <span>d</span>B
                </label>
                <Range
                  className={css.volumeSlider}
                  id={`volume${i}`}
                  key={i}
                  name={i}
                  min={-48}
                  max={3}
                  values={[instrumentVolumes[i]]}
                  step={0.5}
                  onChange={(vol) => handleInstrumentVolumeChange(vol, i)}
                  // disabled={isPlaying}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        backgroundColor: '#ccc',
                        marginTop: '1.2rem',
                        marginBottom: '1.6rem',
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
                {/* <span className={css['dB-level']}>
                    {instrumentVolumes[i]} dB
                  </span> */}

                <label htmlFor={`instrument${i}`}>instrument</label>
                <Select
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

                {/* {Object.entries(samples).map(([key]) => {
                    return (
                      <div key={`${i}${key}`}>
                        <input
                          type="radio"
                          id={`instrument${i}${key}`}
                          name={`instrument${i}`}
                          value={key}
                          checked={false}
                          onChange={handleInstrumentTypeChange}
                        />
                        <label htmlFor={key}>{key}</label>
                      </div>
                    );
                  })} */}
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
