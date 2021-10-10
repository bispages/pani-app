/**
 * This is the View Map for different categories.
 * {key} is id of the category.
 */
import { MapView } from '../types';
import Electrician from '../components/Electrician';
import Plumber from '../components/Plumber';

export const ViewMap: MapView = {
  '1': Electrician,
  '2': Plumber,
};
