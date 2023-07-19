import Home from '../views/home.svelte';
import About from '../views/about.svelte';
import Detail from '../views/detail.svelte';

const routes = {
  '/': Home,
  '/home': Home,
  '/about*': About,
  '/detail/:id': Detail,
}

export default routes;