import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Menus = new Mongo.Collection('Menus');

/** Define a schema to specify the structure of each document in the collection. */
const MenuSchema = new SimpleSchema({
  restaurantName: String,
  headers: {
    type: Array,
    required: false,
  },
  subheaders: {
    type: Array,
    required: false,
  },
  text: Array,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Menus.attachSchema(MenuSchema);

/** Make the collection and schema available to other code. */
export { Menus, MenuSchema };
