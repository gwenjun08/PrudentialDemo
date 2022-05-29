import {Dimensions, PixelRatio} from 'react-native';


const {width, height} = Dimensions.get('window');
const remScale = width / 414;
const pxScale = 1 / PixelRatio.get();

global.screen = {
    width: width,
    height: height
};

global.rem = function(num) {
    return num * remScale;
}
global.px = function(num) {
    return num * pxScale;
}