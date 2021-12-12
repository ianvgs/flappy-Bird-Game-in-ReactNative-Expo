import Matter from "matter-js"
import { getPipeSizePosPair } from "./utils/random";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


export const Physics = (entities, {touches, time, dispatch}) =>{
    let engine = entities.physics.engine

    // filtra pra pegar o pressType do touch
    touches.filter(t => t.type === "press").forEach(t => {
        Matter.Body.setVelocity(entities.Bird.body,{
            x:0,
            y:-4
        })
        
    });


    for (let index = 1; index <= 2; index++) {

        //adicionar scores
        if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point){
            entities[`ObstacleTop${index}`].point = true
            dispatch({type: 'new_point'})
        }
       

         //o if serve pra mandar ele pra direita depois de desaparecer
         if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 0){
             const pipSizePos = getPipeSizePosPair(windowWidth * 0.9)
             Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipSizePos.pipeTop.pos)
             Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipSizePos.pipeBottom.pos)

             entities[`ObstacleTop${index}`].point = false
         }

           //move 3 pixel to left any time
    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x:-3, y:0})
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x:-3, y:0})       
    }


    //esse dispatch manda evento pro app/js dai vc recebe lá pra fazer o game over e outra coisa
    Matter.Events.on(engine, 'collisionStart', (event)=>{
        dispatch({type:'game_over'})
    }) 

    Matter.Engine.update(engine, time.delta)
    return entities
}
export default Physics;