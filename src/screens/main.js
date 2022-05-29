import React, {Component} from 'react';
import {BoxShadow} from 'react-native-shadow';
import LinearGradient from 'react-native-linear-gradient';

import {
    StatusBar,
    StyleSheet,
    View,
    BackHandler
  } from 'react-native';

import NavigationBar from '../widgets/navigationbar';
import AccountInfo from '../widgets/accountInfo';
import MoodGroup from '../widgets/moodgroup';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moodScores: [86, 80, -1, 90, 92, 97, 81],
            averageScore: 0,
        }
    }

    getAverageScore() {
        let count = 0;
        let countScore = 0;
        this.state.moodScores && this.state.moodScores.forEach((score => {
            if(score >= 0) {
                count++;
                countScore += score;
            }
        }));
        if(count > 0) {
            this.setState({
                averageScore: Math.round(countScore / count)
            })
        }
    }

    componentDidMount() {
        this.getAverageScore();
    }

    onBackPress = () => {
        BackHandler.exitApp();
    }

    render() {
        return(
           <View style={style.container}>
               <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
               <View style={[style.bg, {top: rem(56)}]}>
                    <BoxShadow setting={shadowOpt}>
                       <View style={style.contentBg}></View>
                    </BoxShadow>
                    <LinearGradient style={{position:'absolute'}} colors={['rgba(255, 255, 255, 0)', '#fff']}>
                        <View style={{width:screen.width, height: rem(271)}}>
                    </View>
               </LinearGradient>
               </View>
               <View style={style.content}>
                   <NavigationBar title="历史心情指数" onBackPress={this.onBackPress}/>
                   <AccountInfo style={style.account} score={this.state.averageScore} name="甘文俊" headImg={require('~/res/imgs/header.jpeg')}/>
                   <MoodGroup moods={this.state.moodScores}/>
               </View>
           </View>
        )
    }
}

const shadowOpt = {
    width: screen.width - rem(24),
    height: rem(239),
    color: '#000', // 阴影颜色
    border: rem(16), // 阴影宽度
    radius: rem(24), // 与子元素圆角一致
    opacity: 0.1, // 透明
    x: 0, // 偏移量
    y: 0,
    style: { marginVertical: rem(18) }
}

let style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    bg: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentBg: {
        width: screen.width - rem(24),
        height: rem(239),
        backgroundColor: '#fff',
        borderTopStartRadius: rem(24),
        borderTopEndRadius: rem(24)
    },
    content: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: rem(12)
    },
    account: {
        width: '100%'
    }
})

module.exports = Main;