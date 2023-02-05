import { act, render, screen } from '@testing-library/react';
import App from './App';
import MovieList from './MovieList';



// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({
//       id : 1,
//       title : 'title',
//       original_title : 'original_title',
//       posterUrl: 'https://image.tmdb.org/t/p/w500/rnn30OlNPiC3IOoWHKoKARGsBRK.jpg'
//     })
//   })
// );

// beforeEach(() => {
//   fetch.mockClear();
// });


describe('test App should working', () => {
  
  let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
              id : 1,
              title : 'title',
              original_title : 'original_title',
              posterUrl: 'https://image.tmdb.org/t/p/w500/rnn30OlNPiC3IOoWHKoKARGsBRK.jpg'
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

  test('renders fist time and it should run', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', {name: "movie list"})).toBeInTheDocument();
  });

  test('element should exist', async() => {
    const mock = [{
      id : 1,
      title : 'title',
      original_title : 'original_title',
      posterUrl: 'https://image.tmdb.org/t/p/w500/rnn30OlNPiC3IOoWHKoKARGsBRK.jpg'
    },{
      id : 2,
      title : 'title2',
      original_title : 'original_title2',
      posterUrl: 'https://image.tmdb.org/t/p/w500/rnn30OlNPiC3IOoWHKoKARGsBRK.jpg'
    }]
    // render(<MovieList list={mock}/>)
    await act(async() => render(<MovieList list={mock}/>))
    expect(screen.getAllByRole('img')).toHaveLength(2);
    
    // expect(fetch).toHaveBeenCalledTimes(1);
    // expect(screen.getByText("title")).toBeInTheDocument();
  })
});



