import Matter from "matter-js";
import React from "react";
import { View } from "react-native";


const Floor = props =>{
    const widthBody = props.body.bounds.max.x -  props.body.bounds.min.x  

    const heighthBody = props.body.bounds.max.y -  props.body.bounds.min.y  

    const xBody = props.body.position.x -widthBody/2
    const yBody = props.body.position.y -heighthBody/2

    const color = props.color

    return(
        <View  style={{

            backgroundColor:color,
           


            position:'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heighthBody
        }}/>
    )
}

export default (world,color,pos,size) => {

    const initialFloor = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
        label:'Floor',
        isStatic:true
        }
    )
    Matter.World.add(world, initialFloor)

    return{
        body:initialFloor,
        color,
        pos,
        renderer: <Floor/>
    }
}