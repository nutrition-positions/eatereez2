import React from 'react';
import { Grid, Loader, Header, Image, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/restaurant/Restaurants';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for editing a single document. */
class RestaurantDetails extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">{this.props.doc.name}</Header>
            <Image size='medium' src={this.props.doc.image}/>
            <Header as='h4'>{this.props.doc.description}</Header>
            <Header as='h4'>{this.props.doc.rating} / 5 stars</Header>
            <Header as='h4'>Phone number: {this.props.doc.phoneNumber}</Header>
            <Header as='h4'>Address: {this.props.doc.address}</Header>
            <Feed>
             <Review reviews={this.props.reviews.filter(review => (review.restaurantName === this.props.doc.name))}/>
            </Feed>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
RestaurantDetails.propTypes = {
  doc: PropTypes.object,
  reviews: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  const subscriptionReviews = Meteor.subscribe('Reviews');
  return {
    doc: Restaurants.findOne(documentId),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscriptionReviews.ready(),
  };
})(RestaurantDetails);
