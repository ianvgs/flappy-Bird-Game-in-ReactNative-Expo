import Matter from "matter-js";
import Birds from "../components/Birds";
import Floor from "../components/Floor";

import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default restart => {

    let engine = Matter.Engine.create({enableSleeping:false})

   /*  engine.gravity = 0.4; */

    let world = engine.world


   world.gravity.y = 0.4; 


   const pipeSizePosA = getPipeSizePosPair()

   //0.9 é pra ilusao
   const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)

    return{
        physics:{engine,world},

        Bird: Birds(world, 'green', {x:50, y:300},{ height:40, width:40}),
        // Esse windowWidth/2 é invés de x=0
        Floor: Floor(world, 'green', {x:windowWidth/2, y:windowHeight},{ height:50, width:windowWidth}),

        ObstacleTop1: Obstacle(world,'ObstacleTop1', 'blue', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world,'ObstacleBottom1', 'orange', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),


        ObstacleTop2: Obstacle(world,'ObstacleTop2', 'blue', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world,'ObstacleBottom2', 'orange', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
        
        
        
       
    }
}