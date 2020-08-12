import Matter from 'matter-js'
import { degrees, radians } from 'radians'
import random from 'random'
import * as PIXI from 'pixi.js'
import { width, height } from './config'
import './style.scss'


window.start = () => {
	
	// PIXI js
	let app = new PIXI.Application({
		width: width, height: height
	})
	document.body.appendChild(app.view)
	app.view.id = 'pixijs'

	// Matter js
  let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
	Constraint = Matter.Constraint,
  Bodies = Matter.Bodies,
	Body = Matter.Body;

	// create engine
	let engine = Engine.create()
	let world = engine.world
	let runner = Runner.create()
	let renderer = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: width,
			height: height,
			showVelocity: true
		}
	})
	renderer.canvas.id = 'matterjs'
	renderer.canvas.style.opacity = .5
	// run physics
	Render.run(renderer)
	Runner.run(runner, engine)

	// add bodies
	World.add(world, [
		Bodies.rectangle(width/2, height + 50, width, 200, { isStatic: true })
	])

	// fit the render viewport to the scene
	Render.lookAt(renderer, {
		min: { x: 0, y: 0 },
		max: { x: width, y: height }
	})

	function render() { // custom render()
	}
	// render()

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: renderer,
    canvas: renderer.canvas,
    stop: () => {
      Matter.Render.stop(renderer)
      Matter.Runner.stop(runner)
    }
  }

}
