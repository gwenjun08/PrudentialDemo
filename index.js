/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Global from './src/constant/Global';
import App from './src/screens/main';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
