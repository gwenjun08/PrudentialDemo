import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BoxShadow } from 'react-native-shadow';
import {
    StyleSheet,
    View,
    Animated,
    TouchableOpacity
} from 'react-native';
import { getWeekDay, transformDateDay2LocalDay } from '../utils/dataUtil';

export default class Mood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCurDayStatus: this.initCurDayStatus(props.day),
            dayTextOpacity: new Animated.Value(0),
            dayViewScale: new Animated.Value(0),
            columnarHeight: new Animated.Value(rem(44)),
            iconScale: new Animated.Value(0),
            scoreTextOpacity: new Animated.Value(0),
            isSelctedStatus: this.props.selected
        }
    }

    componentDidMount() {
        this.initAnim();
    }

    notifyChange = (status) => {
        console.log("notifyChange index -> " + this.props.index)
        this.setState({
            isSelctedStatus: status
        });
    }

    initCurDayStatus(day) {
        let date = new Date();
        let curDay = getWeekDay(transformDateDay2LocalDay(date.getDay()))
        return curDay == day;
    }

    initAnim() {
        this.dayTextOpacityAnim();
        this.columnarAnim();
    }

    columnarAnim() {
        let score = this.props.score;
        let narHeight = rem(280) / 100 * score;
        narHeight = narHeight > 0 ? narHeight : rem(100);

        let narHeightScaleVelocity = rem(280) / 400.0;
        let narHeightScaleDuration = narHeight / narHeightScaleVelocity;
        
        let anims = [
            Animated.timing(this.state.iconScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(this.state.columnarHeight, {
                toValue: narHeight,
                duration: narHeightScaleDuration
            }),
            Animated.timing(this.state.scoreTextOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ];
        Animated.sequence(anims).start();
    }

    dayTextOpacityAnim() {
        let sizeAnimDuration = this.state.isCurDayStatus ? 200 : 0;
        let anims = [
            Animated.timing(this.state.dayViewScale, {
                toValue: 1,
                duration: sizeAnimDuration,
                useNativeDriver: true
            }),
            Animated.timing(this.state.dayTextOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ];
        Animated.sequence(anims).start();
    }

    getColumnarBgColor() {
        let score = this.props.score;
        let isSelected = this.state.isSelctedStatus;
        if(score >= 90) {
            return isSelected ? ['#ffa14a', '#ffcc4a'] : ['#ff823c', '#ff823c'];
        } else if(score > 0 && score < 90) {
            return isSelected ? ['#42F373', '#A1FD44'] : ['#52C873', '#52C873']
        } else {
            return ['#CFCFCF', '#CFCFCF']
        }
    }

    getIcon() {
        let score = this.props.score;
        if(score >= 90) {
            return require('~/res/imgs/verygood.png');
        } else if(score > 0 && score < 90) {
            return require('~/res/imgs/good.png');
        } else {
            return require('~/res/imgs/unkonw.png');
        }
    }

    onPress = () => {
        this.setState({
            isSelctedStatus: !this.state.isSelctedStatus
        }, () => {
            this.props.onSelectChange && this.props.onSelectChange(this.props.index, this.state.isSelctedStatus);
        });
    }

    renderDay() {
        if(this.state.isSelctedStatus) {
            return(
                <BoxShadow setting={shadowOpt}>
                    <Animated.View style={[this.state.isCurDayStatus ? style.curdayview : style.nordayview, 
                        {transform: [
                            {scale: this.state.dayViewScale}
                        ]}]}>
                        <Animated.Text style={[this.state.isCurDayStatus ? style.curdaytext : style.nordaytext, 
                            {opacity: this.state.dayTextOpacity}]}>{this.props.day}</Animated.Text>
                    </Animated.View>
                </BoxShadow>
            )
        } else {
            return(
                <Animated.View style={[this.state.isCurDayStatus ? style.curdayview : style.nordayview, 
                    {transform: [
                        {scale: this.state.dayViewScale}
                    ]}]}>
                    <Animated.Text style={[this.state.isCurDayStatus ? style.curdaytext : style.nordaytext, 
                        {opacity: this.state.dayTextOpacity}]}>{this.props.day}</Animated.Text>
                </Animated.View>
            )
        }
    }

    render() {
        let icon = this.getIcon();
        let columnarColors = this.getColumnarBgColor();
        return(
            <View style={[style.container, this.props.style]}>
                <LinearGradient style={[style.columnarBg, 
                    this.state.isSelctedStatus && this.props.score > 0 ? style.narShadow : {}]} 
                    colors={columnarColors}>
                    <Animated.View style={[style.columnar, {height: this.state.columnarHeight}]}>
                        <Animated.Text style={[style.score, {opacity: this.state.scoreTextOpacity}]}>
                            {this.props.score > 0 ?  this.props.score :  ""}
                        </Animated.Text>
                        <Animated.Image style={[style.icon, {transform: [
                            {scale: this.state.iconScale}
                        ]}]} source={icon}/>
                    </Animated.View>
                </LinearGradient>
                <TouchableOpacity onPress={this.onPress}>
                    {this.renderDay()}
                </TouchableOpacity>
            </View>
        )
    }
      
}

const shadowOpt = {
    width: rem(36),
    height: rem(36),
    color: '#000', // 阴影颜色
    border: rem(10), // 阴影宽度
    radius: rem(8), // 与子元素圆角一致
    opacity: 0.1, // 透明
    x: 0, // 偏移量
    y: rem(4)
}

const narShadowOpt = {
    width: rem(36),
    height: rem(36),
    color: '#000', // 阴影颜色
    border: rem(10), // 阴影宽度
    radius: rem(8), // 与子元素圆角一致
    opacity: 0.05, // 透明
    x: 0, // 偏移量
    y: rem(4)
}

let style = StyleSheet.create({
    container: {
        width: rem(50),
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    nordaytext: {
        fontFamily: 'PingFang HK',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: rem(18),
        lineHeight: rem(25),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: rem(-0.3),
        color: '#2d2f33'
    },
    curdaytext: {
        fontFamily: 'PingFang HK',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: rem(18),
        lineHeight: rem(25),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: rem(-0.3),
        color: '#fff'
    },
    nordayview: {
        width: rem(36),
        height: rem(36),
        borderRadius: rem(8),
        backgroundColor: '#fff',
        alignItems : 'center',
        justifyContent: 'center'
    },
    curdayview: {
        width: rem(36),
        height: rem(36),
        borderRadius: rem(8),
        backgroundColor: '#2d2f33',
        alignItems : 'center',
        justifyContent: 'center'
    },
    columnar: {
        width: rem(44),
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: rem(30),
    },
    columnarBg: {
        position: 'absolute', 
        bottom: rem(48), 
        borderRadius: rem(30)
    },
    narShadow: {
        elevation: 6,
        borderWidth: rem(3),
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: rem(30)
    },
    icon: {
        width: rem(36),
        height: rem(36),
        borderRadius: rem(18),
        position: 'absolute',
        bottom: rem(4)
    },
    score: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: rem(20),
        lineHeight: rem(27),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: rem(-0.3),
        color: '#fff',
        marginTop: rem(12)
    },
})