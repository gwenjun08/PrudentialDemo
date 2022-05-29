import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Mood from './mood.js';
import {getWeekDay} from '../utils/dataUtil.js'

export default class MoodGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moodViews: [],
            selectedIndex: -1
        }
        this.moodRefs = [];
    }

    componentDidMount() {
        this.props.moods && this.props.moods.length == 7 && this.addMood(this.props.moods[0], 0);
    }

    addMood(value, index) {
        let marginStart = index == 0 ? 0 : rem(6.67)
        this.state.moodViews.push(
            <Mood ref={(ref) => this.moodRefs.push(ref)} selected={index == this.state.selectedIndex} onSelectChange={this.onSelectChange}
            index={index} style={[style.mood, {marginStart: marginStart}]} score={value} day={getWeekDay(index)}/>
        );
        this.setState({
            moodViews: this.state.moodViews
        });
        if(index < this.props.moods.length - 1) {
            setTimeout(() => {
                this.addMood(this.props.moods[index + 1], index + 1);
            }, 200);
        }
    }

    onSelectChange = (index, status) => {
        if(status) {
            if(this.state.selectedIndex >= 0) {
                console.log("index ref -> " )
                this.moodRefs[this.state.selectedIndex].notifyChange(false);
            }
            // this.state.moodViews[]
            this.setState({
                selectedIndex: index
            });
        }
    }

    render() {
        return(
            <View style={style.container}>
                {this.state.moodViews}
            </View>
        )
    }
      
}

let style = StyleSheet.create({
    container: {
        width: '100%',
        height: rem(328),
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    mood: {
        height: '100%',
    }
})