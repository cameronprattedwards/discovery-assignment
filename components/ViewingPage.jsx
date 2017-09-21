import React from 'react';
import YouTube from 'react-youtube';
import {Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router-dom';

import css from './ViewingPage.scss';

const additionalVideoShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
});

class ViewingPage extends React.Component {
  static propTypes = {
    additionalVideos: React.PropTypes.arrayOf(additionalVideoShape).isRequired,
    featuredVideo: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.loadPage();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.featuredVideo !== this.props.featuredVideo) {
      this.props.loadPage();
    }
  }

  getThumbnails() {
    return this.props.additionalVideos.map(video => {
      return (
        <Col md={6} xs={12} className={css.column} key={video.id}>
          <Link className={css.thumbnailWrapper} to={`/watch/${video.id}`}>
            <img className={css.thumbnail} src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} />
            <div className={css.description}>
              <strong>{video.title}</strong>
              <p>{video.description}</p>
            </div>
          </Link>
        </Col>
      );
    });
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

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
        <Row around="xs">{this.getThumbnails()}</Row>
      </div>
    );
  }
}

export {ViewingPage};
