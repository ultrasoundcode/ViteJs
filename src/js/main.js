import '../scss/style.scss';
import { createClient } from 'pexels';
const API_KEY = 'cEWB16aQH1aaqo9IW2WEAn5BgQCZxWoKFOw51dWVVTimF49DMh3fAs5C';

const client = createClient(API_KEY);
let query, page;
const form = document.getElementById('searchForm');
const list = document.getElementById('results');
const loadMore = document.getElementById('load-more');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target.elements.search.value);
  query = e.target.elements.search.value;
  client.photos.search({ query, page: 1, per_page: 2 }).then((result) => {
    console.log(result);
    page = result.page + 1;
    getResults(result.photos);
  });
});

loadMore.addEventListener('click', (e) => {
  client.photos.search({ query, page, per_page: 2 }).then((result) => {
    console.log(result);
    page = result.page + 1;
    getResults(result.photos);
  });
});

function createItem(source, description) {
  return `<li><img src=${source} alt=${description}/></li>`;
}
function getResults(photos) {
  const result = photos
    .map((image) => createItem(image.src.tiny, image.alt))
    .join('');
  list.insertAdjacentHTML('beforeend', result);
}
