import List from './components/List.svelte';
import Profile from './components/Profile.svelte';


const list = new List({
	target: document.body.querySelector('#main-section'),
});

const profile = new Profile({
	target: document.body.querySelector('#profile-section'),
});

