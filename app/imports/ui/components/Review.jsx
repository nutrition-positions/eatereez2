import React from 'react';
import { Feed, HeaderContent, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
        <Feed.Event>
          <Feed.Content>
            <hr />
            <Feed.Summary>
              <HeaderContent> {this.props.review.title} </HeaderContent>
              <Feed.Like>
                {this.props.review.stars} / 5
                <Icon name='star' />
              </Feed.Like>
            </Feed.Summary>
            <Feed.Meta>
              {this.props.review.owner} posted on <Feed.Date content={this.props.review.createdAt} />
            </Feed.Meta>
            <Feed.Extra text>
              {this.props.review.description}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);
