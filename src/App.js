import { useState , useEffect } from 'react';
import './App.css';
import { Container ,buttonStyle , imgStyle} from './style.js'
import MovieList from './MovieList';





function App() {
  const [list, setList] = useState([]);
  const [like, setLike] = useState([]);
  const [count, setCount] = useState(0);
  const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=1";

  const handleFetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((myJson) => {
        // console.log(myJson);
        setList(
          myJson.results.map((ele) => {
            return {
              id: ele.id,
              title: ele.title ? ele.title : ele.original_title,
              posterUrl: `https://image.tmdb.org/t/p/w500${ele.poster_path}`,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleLikeData=()=>{
    const state = JSON.parse(localStorage.getItem('list')) ;
    // console.log(state)
    if(state){
      setLike([...state])
    }
  }
  

  const handleDelete = (id) => {
    setCount((pre)=>pre-1)
    const data = JSON.parse(localStorage.getItem('list'))
    const index = data.findIndex((ele)=>ele.id === id)
    data.splice(index,1)
    localStorage.setItem('list',JSON.stringify(data))
    
  }

  useEffect(()=>{
    handleFetchData(url)
  },[])
  

  useEffect(()=>{
    handleLikeData()
  },[count])

  return (
    <div className="App">
      <h1>movie list</h1>
      
      {list.length >0?<MovieList list={list} setCount={setCount}/>:''}
      
      <h1>like list</h1>
      
      <Container>
      {like.map((item)=> {
        return(
          <div key={item.id} className='movie'>
              <img src={item.posterUrl} alt={item.originalTitle} style={imgStyle}/>
              <button type="vlaue" style={buttonStyle} onClick={()=>{handleDelete(item.id)}}>delete</button>
          </div>
        )
      })}
      </Container>
    </div>
  );
}

export default App;
