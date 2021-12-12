import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import entities from './entities';
import Physics from './physics';

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)


  useEffect(()=>{
    setRunning(false)
  },[])

  return (
    <View style={styles.container}>

      <Text style={{textAlign:'center', fontSize:40, fontWeight:'bold', margin:20}}>{currentPoints}</Text>

      <GameEngine 
      style={{
        position: 'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0
      }}  
      entities={entities()} 
      systems={[Physics]}
      running={running}
      onEvent={(e) =>{
        switch(e.type) {
          case 'game_over':
            setRunning(false)
            gameEngine.stop()
            setCurrentPoints(0)
            break;

            case 'new_point':  
            setCurrentPoints(currentPoints + 1)
            break;


        }



      }}
      ref={(ref) =>{setGameEngine(ref)}}
      >

    <StatusBar style="auto" hidden={true}/>


      </GameEngine        
      >

      {!running ?
       <View
       style={{flex:1, justifyContent:'center', alignItems:'center'}}>
         <TouchableOpacity style={{backgroundColor:'black', paddingHorizontal:30, paddingVertical:10}}
         onPress={()=>{
           setRunning(true)
           gameEngine.swap(entities())
           setCurrentPoints(0)
         }}>
           <Text style={{fontWeight:'bold', color:'white', fontSize:30}}>
             START GAME
           </Text>
         </TouchableOpacity>




       </View> :
        null }



      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1   
  },
});
