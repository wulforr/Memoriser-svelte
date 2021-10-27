<script>
	import { userInfo } from './store.js';
	import Router from 'svelte-spa-router';
	import routes from './routes';
	import './app.css';
	import Header from './lib/header/Header.svelte'
	import { onMount } from 'svelte';
	import {getCookie} from './utils/cookie'

	onMount(() => {
		let cookie = getCookie('userToken');
		if(cookie){
			userInfo.set(cookie); 
		}
	});
</script>

<div>
	<Header userName={$userInfo?.userName} />
	<main>
		<Router {routes} />
	</main>
</div>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>