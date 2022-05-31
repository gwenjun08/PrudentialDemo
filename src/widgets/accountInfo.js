import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Animated
} from 'react-native';

export default class AccountInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacityAnimation: new Animated.Value(0),
        }
    }

    componentDidMount() {
        Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start();
    }

    render() {
        return(
            <Animated.View style={[style.container, {opacity: this.state.opacityAnimation}]}>
                <View style={style.userInfo}>
                    <Image style={style.headImg} source={this.props.headImg}/>
                    <Text style={style.name}>{this.props.name}</Text>
                </View>
                <Text style={style.score}>{this.props.score || '0'}</Text>
                <Text style={style.tip}>周平均心情指数</Text>
            </Animated.View>
        )
    }
      
}

let style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: rem(34),
        marginTop: rem(46)
    },
    userInfo: {
        flexDirection:'row',
        alignItems: 'center',
    },
    headImg: {
        width: rem(36),
        height: rem(36),
        borderRadius: rem(18),
        borderColor: '#ddd',
        borderWidth: px(2)
    },
    name: {
        fontFamily: 'PingFang HK',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: rem(20),
        lineHeight: rem(28),
        color: '#2d2f33',
        marginStart: rem(12)
    },
    score: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: rem(72),
        lineHeight: rem(98),
        color: '#2d2f33',
    },
    tip: {
        ontFamily: 'PingFang HK',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: rem(18),
        lineHeight: rem(25),
        color: '#929292',
    }
})