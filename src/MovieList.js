import { Container ,buttonStyle , imgStyle } from "./style";

import React from 'react'

const MovieList = (props) => {
    
    const handleMovieClick =(obj)=>{
        const item = localStorage.getItem('list') ? true : false;
        if(!item){
          console.log(obj)
          localStorage.setItem('list', JSON.stringify([obj]))
          props.setCount((pre)=>pre+1)
        }
        else{
          const data = JSON.parse(localStorage.getItem('list'))
          data.push(obj)
          localStorage.setItem('list',JSON.stringify(data))
          props.setCount((pre)=>pre+1)
        }
      }
    
      

  return (
        <Container>
        {props.list?.map((item) => {
          return (
            <div key={item.id} className='movie'>
              <img src={item.posterUrl} alt={item.originalTitle} style={imgStyle}/>
              <button type="vlaue" style={buttonStyle} onClick={()=>{handleMovieClick(item)}}>Get</button>
            </div>
        )})}
        </Container>
  )
}

export default MovieList