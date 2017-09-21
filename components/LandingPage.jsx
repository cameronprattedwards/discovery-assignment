import React from 'react';
import YouTube from 'react-youtube';
import {Row, Col} from 'react-flexbox-grid';
import Infinite from 'react-infinite';
import css from './LandingPage.scss';
import {Link} from 'react-router-dom';

const additionalVideoShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
});

class LandingPage extends React.Component {
  static propTypes = {
    additionalVideos: React.PropTypes.arrayOf(additionalVideoShape).isRequired,
    featuredVideo: React.PropTypes.string.isRequired,
    onInfiniteLoad: React.PropTypes.func.isRequired,
    isInfiniteLoading: React.PropTypes.bool.isRequired,
    loadPage: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadPage();
  }

  getThumbnails() {
    return this.props.additionalVideos.map(video => {
      return (
        <Link className={css.thumbnailWrapper} to={`/watch/${video.id}`} key={video.id}>
          <img className={css.thumbnail} src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} />
          <div className={css.description}>
            <strong>{video.title}</strong>
            <p>{video.description}</p>
          </div>
        </Link>
      );
    });
  }

  render() {
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };

    return (
      <div>
        <div className={css.featured}>
          <YouTube videoId={this.props.featuredVideo} opts={opts} />
        </div>
        <Infinite 
          elementHeight={200}
          useWindowAsScrollContainer
          onInfiniteLoad={this.props.onInfiniteLoad}
          isInfiniteLoading={this.props.isInfiniteLoading}
          infiniteLoadBeginEdgeOffset={200}
        >
          {this.getThumbnails()}
        </Infinite>
      </div>
    );
  }
}

export {LandingPage};
