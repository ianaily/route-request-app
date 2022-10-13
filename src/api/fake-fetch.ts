import data from 'src/data.json';

export default function fakeFetch(url: 'routes' | 'points') {
  return data[url];
}
