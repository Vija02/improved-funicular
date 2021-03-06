import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-primitives'
import Typist from 'react-typist';

import RefreshRedirect from 'components/RefreshRedirect';
import PressToContinue from 'components/PressToContinue';

import DialogText from './DialogText.json'

import type from 'assets/type.wav';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      finished: false,
      redirect: null,
      currentLine: 0
    }
    this.audio = new Audio(type);
    this.audio.loop = true;
    this.audio.volume = 0.35;
  }
  componentWillMount(){
    this.redirectAdd("0");
  }
  componentDidMount(){
    this.overlay.focus()
    this.audio.play();
  }
  componentWillUnmount(){
    this.audio.pause();
  }
  // If keyboard or mouse
  onProgress(){
    if(!this.state.finished){
      this.onTypingDone()
    }else{
      if(DialogText[this.props.match.params.dialog].length - 1 === this.state.currentLine){
        this.redirectAdd('done')
      }else{
        this.audio.play()
        this.setState({currentLine: this.state.currentLine + 1, finished: false})
        this.redirectAdd(this.state.currentLine + 1);
      }
    }
  }
  onTypingDone(){
    this.audio.pause();
    this.setState({finished: true})
  }
  redirect(){
    if(this.props.match.params.origin){
      this.setState({redirect: `/${this.props.match.params.origin}`});
    }else{
      this.setState({redirect: '/'});
    }
  }
  redirectAdd(path){
    if(this.props.match.params.origin){
      this.setState({redirect: `/${this.props.match.params.origin}/${this.props.match.params.dialog}/` + path});
    }else{
      this.setState({redirect: `/${this.props.match.params.dialog}/` + path});
    }
  }
  render() {
    const dialogueText = DialogText[this.props.match.params.dialog][this.state.currentLine];
    const match = dialogueText.match(/(.*:) (?:(.+?)~(?:--font:(.*))?)/);
    let dialogueTitle = match[1].replace(':', "")
    let dialogueBody = match[2];
    let dialogueClassName = match[3] ? match[3] : "";
    if(this.props.name){
      dialogueTitle = dialogueTitle.replace(/\?\?\?/, this.props.name);
      dialogueBody = dialogueBody.replace(/\?\?\?/, this.props.name);
    }
    // Omg so much absolutes, but no time to fix >.>
    return(
      <View style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        {
          this.state.redirect ? <RefreshRedirect to={this.state.redirect} /> : null
        }
        {/* Overlay */}
        <View style={{
          position: "absolute",
          zIndex: 10000, // xd
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
          ref={(ref) => {this.overlay = ref}}
          tabIndex="0"
          onClick={() => {this.onProgress()}}
          onKeyDown={(e) => {this.onProgress(); e.stopPropagation()}}>
        </View>

        {/* Dialog box */}
        <View style={{
          position: "absolute",
          top: "43.75vw",
          left: "2vw",
          right: "2vw",
          bottom: "2vw",
          // backgroundColor: "#404040",
          backgroundColor: "#b9ab84",
          borderRadius: "5",
          padding: 20,
          border: "0.1px solid rgba(255, 255, 255, 0.25)"
        }}>
          <Text style={{color: "black", fontWeight: "bold", paddingBottom: "0.5em"}}>{dialogueTitle}</Text>
          {
            this.state.finished
            ?
            <Text className={`Typist ${dialogueClassName}`}>
              {dialogueBody}
              <PressToContinue />
            </Text>
            :
            <Typist className={`Typist ${dialogueClassName}`} cursor={{show: false}} onTypingDone={() => {this.onTypingDone()}}>
              {dialogueBody}
            </Typist>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name.name,
  };
};

export default connect(mapStateToProps, null, null, { withRef: true })(Index);
