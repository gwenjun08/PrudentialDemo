import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onBackPress && this.props.onBackPress();
    }

    render() {
        return(
            <View style={style.container}>
                <TouchableOpacity onPress={this.onPress} style={style.backBtn}>
                    <Image style={style.backImage} source={require('~/res/imgs/back_arrow.png')}/>
                </TouchableOpacity>
                <Text style={style.title} allowFontScaling={false}>{this.props.title}</Text>
                <View style={style.backBtn}/>
            </View>
        )
    }
      
}

let style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: rem(56),
        paddingHorizontal: rem(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backBtn: {
        width: rem(36),
        height: rem(36),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backImage: {
        width: rem(23.5),
        height: rem(17),
    },
    title: {
        fontFamily: 'PingFang HK',
        fontStyle: 'normal',
        fontSize: rem(20),
        fontWeight: '500',
        color: '#000'
    }
})