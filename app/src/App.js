import './App.css';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    "C1": "r",
    "C2": "b",
    "C3": "o",
    "C4": "g",
    "C5": "w",
    "C6": "y",
    "L14": "rg",
    "L12": "rb",
    "L15": "rw",
    "L16": "ry",
    "L23": "bo",
    "L25": "bw",
    "L26": "by",
    "L34": "og",
    "L35": "ow",
    "L36": "oy",
    "L45": "gw",
    "L46": "gy",
    "Q126": "rby",
    "Q164": "ryg",
    "Q145": "rgw",
    "Q152": "rwb",
    "Q236": "boy",
    "Q253": "bwo",
    "Q346": "ogy",
    "Q354": "owg",
  })
  return (
    <div>
      <Rubik state={state}/>
      <button onClick={() => setState(rotate(state))}>F</button>
      <button onClick={() => setState(vertical(rotate(vertical(vertical(vertical(state))))))}>U</button>
      <button onClick={() => setState(vertical(vertical(vertical(rotate((vertical(state)))))))}>D</button>
      <button onClick={() => setState(horizontal(horizontal(horizontal(rotate(horizontal(state))))))}>R</button>
      <button onClick={() => setState(horizontal(rotate(horizontal(horizontal(horizontal(state))))))}>L</button>
      <button onClick={() => setState(horizontal(horizontal(rotate(horizontal(horizontal(state))))))}>B</button>
      <button onClick={() => setState(horizontal(state))}>Y</button>
      <button onClick={() => setState(vertical(state))}>X</button>
    </div>
  );
}

function Rubik({state}) {
  return (
    <div>
      <div style={{"clear": "both"}}>
        <GridPadding/>
        <Grid colors={[
          state.Q354[1],
          state.L35[1],
          state.Q253[1],
          state.L45[1],
          state.C5,
          state.L25[1],
          state.Q145[2],
          state.L15[1],
          state.Q152[1],
        ]}/>
      </div>
      <div style={{"clear": "both"}}>
        <Grid colors={[
          state.Q354[2],
          state.L45[0],
          state.Q145[1],
          state.L34[1],
          state.C4,
          state.L14[1],
          state.Q346[1],
          state.L46[0],
          state.Q164[2],
        ]}/>
        <Grid colors={[
          state.Q145[0],
          state.L15[0],
          state.Q152[0],
          state.L14[0],
          state.C1,
          state.L12[0],
          state.Q164[0],
          state.L16[0],
          state.Q126[0]
        ]}/>
        <Grid colors={[
          state.Q152[2],
          state.L25[0],
          state.Q253[0],
          state.L12[1],
          state.C2,
          state.L23[0],
          state.Q126[1],
          state.L26[0],
          state.Q236[0], 
        ]}/>
        <Grid colors={[
          state.Q253[2],
          state.L35[0],
          state.Q354[0],
          state.L23[1],
          state.C3,
          state.L34[0],
          state.Q236[1],
          state.L36[0],
          state.Q346[0],
        ]}/>
      </div>
      <div style={{"clear": "both"}}>
        <GridPadding/>
        <Grid colors={[
          state.Q164[1],
          state.L16[1],
          state.Q126[2],
          state.L46[1],
          state.C6,
          state.L26[1],
          state.Q346[2],
          state.L36[1],
          state.Q236[2]
        ]}/>
      </div>
    </div>
  )
}

const components = {
  "b": <Cell color="blue"/>,
  "g": <Cell color="green"/>,
  "k": <Cell color="black"/>,
  "o": <Cell color="orange"/>,
  "r": <Cell color="red"/>,
  "y": <Cell color="yellow"/>,
  "w": <Cell color="white"/>,
  "p": <Cell color="purple"/>
}

function GridPadding() {
  return <Grid colors="kkkkkkkkk"/>
}

function Grid({colors}) {
  return (
    <table style={{float: "left"}}>
      <tbody>
        <tr>
          {components[colors[0]]}
          {components[colors[1]]}
          {components[colors[2]]}
        </tr>
        <tr>
          {components[colors[3]]}
          {components[colors[4]]}
          {components[colors[5]]}
        </tr>
        <tr>
          {components[colors[6]]}
          {components[colors[7]]}
          {components[colors[8]]}
        </tr>
      </tbody>
    </table>
  )
}

function Cell({color}) {
  return <td style={{background: color}}/>
}

function rotate(state) {
  const newState = {...state}
  newState.L12 = state.L15
  newState.L16 = state.L12
  newState.L14 = state.L16
  newState.L15 = state.L14
  newState.Q126 = state.Q152
  newState.Q164 = state.Q126
  newState.Q145 = state.Q164
  newState.Q152 = state.Q145
  return newState
}

function horizontal(state) {
  const newState = {
    "C1": state.C2, 
    "C2": state.C3,
    "C3": state.C4,
    "C4": state.C1,
    "C5": state.C5,
    "C6": state.C6,
    "L14": flip(state.L12),
    "L12": state.L23,
    "L15": state.L25,
    "L16": state.L26,
    "L23": state.L34,
    "L25": state.L35,
    "L26": state.L36,
    "L34": flip(state.L14),
    "L35": state.L45,
    "L36": state.L46,
    "L45": state.L15,
    "L46": state.L16,
    "Q126": state.Q236,
    "Q164": rotateQuina(rotateQuina(state.Q126)),
    "Q145": rotateQuina(state.Q152),
    "Q152": state.Q253,
    "Q236": state.Q346,
    "Q253": state.Q354,
    "Q346": rotateQuina(state.Q164),
    "Q354": rotateQuina(rotateQuina(state.Q145)),
  }
  return newState
}

function flip(lado) {
  return lado[1] + lado[0]
}

function rotateQuina(quina) {
  return quina[2] + quina[0] + quina[1]
}

function vertical(state) {
  const newState = {
    "C1": state.C6, 
    "C2": state.C2,
    "C3": state.C5,
    "C4": state.C4,
    "C5": state.C1,
    "C6": state.C3,
    "L14": flip(state.L46),
    "L12": flip(state.L26),
    "L15": flip(state.L16),
    "L16": flip(state.L36),
    "L23": state.L25, 
    "L25": flip(state.L12),
    "L26": state.L23, 
    "L34": flip(state.L45),
    "L35": flip(state.L15),
    "L36": flip(state.L35),
    "L45": flip(state.L14),
    "L46": flip(state.L34),
    "Q126": rotateQuina(state.Q236),
    "Q164": rotateQuina(state.Q346),
    "Q145": rotateQuina(rotateQuina(state.Q164)),
    "Q152": rotateQuina(state.Q126),
    "Q236": state.Q253,
    "Q253": rotateQuina(state.Q152),
    "Q346": rotateQuina(rotateQuina(state.Q354)),
    "Q354": rotateQuina(state.Q145),
  }
  return newState
}

export default App;
