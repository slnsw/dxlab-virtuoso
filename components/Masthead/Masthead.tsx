import { Component } from 'react';
import PropTypes from 'prop-types';

import shuffle from '../../lib/shuffle';
// import './Masthead.css';
// import '../../styles/glitch.css';

type Props = {
  className: string;
  title: string | object;
  titleSmall: string;
  titleHighlight: string;
  subtitle: string;
  text: string;
  sideText?: string;
  backgroundImageUrl: string;
  size?: string;
  slug?: string;
  caption?: string;
};

class Masthead extends Component<Props> {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    titleSmall: PropTypes.string,
    titleHighlight: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    sideText: PropTypes.string,
    backgroundImageUrl: PropTypes.string,
    size: PropTypes.string,
  };

  componentDidMount() {
    shuffle(this.props.slug.replace(/ /g, '-'));
  }

  render() {
    return (
      <div
        className={`masthead ${
          this.props.size ? `masthead--${this.props.size}` : ''
        } ${this.props.className ? this.props.className : ''}`}
      >
        <div
          className="masthead__bg"
          style={
            this.props.backgroundImageUrl
              ? {
                  backgroundImage: `url(${this.props.backgroundImageUrl})`,
                }
              : {}
          }
        />

        <div
          className={`masthead__content container container--${
            this.props.size ? 'lg' : 'lg'
          }`}
        >
          {this.props.subtitle && (
            <div className="masthead__subtitle">{this.props.subtitle}</div>
          )}

          <h1 className="masthead__title">
            <span className="masthead__title__small">
              {this.props.titleSmall}
            </span>
            <span
              className={`masthead__title__main ${
                this.props.slug
                  ? `masthead__title__main--${this.props.slug.replace(
                      / /g,
                      '-',
                    )}`
                  : ''
              }
               glitch`}
              data-text={this.props.title}
            >
              {this.props.title}
            </span>
            <span
              className={`masthead__title__highlight ${
                this.props.slug
                  ? `masthead__title__highlight--${this.props.slug.replace(
                      / /g,
                      '-',
                    )}`
                  : ''
              }`}
            >
              {this.props.titleHighlight}
            </span>
          </h1>

          {this.props.text && (
            <p className="masthead__intro-text">{this.props.text}</p>
          )}

          <p className="masthead__intro-list">{this.props.sideText}</p>

          {this.props.caption && (
            <div className="masthead__caption">{`${this.props.caption}_`}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Masthead;
