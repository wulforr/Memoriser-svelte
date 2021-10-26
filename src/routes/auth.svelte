<!-- <script context="module">
	export async function load({ session }) {
		if (session) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script> -->

<script>
	import { userInfo } from '../store.js';
	import { onMount } from 'svelte';
	import {replace} from 'svelte-spa-router'
	import Login from '../lib/Login.svelte';
	import Signup from '../lib/Signup.svelte';
	let userName = null;
	$: userName = $userInfo.userName;
	onMount(() => {
		if(userName){
			replace('/');
		}
	})

	let showLogin = true;
	const toggleShowLogin = () => {
		showLogin = !showLogin;
	};
</script>

<div>
	{#if showLogin}
		<Login {toggleShowLogin} />
	{:else}
		<Signup {toggleShowLogin} />
	{/if}
</div>
