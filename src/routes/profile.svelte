<script>
	import { userInfo, data } from '../store.js';
	import Accordion from '../lib/Accordion.svelte';
	import { deleteCookie } from '../utils/cookie';
	import { onMount } from 'svelte';
	let userName = null;
	let allSentences = null, allWords = null;
	$: userName = $userInfo.userName;
	$: if($data){
		[allSentences, allWords] = $data;
	}
	onMount(() => {
		if(!userInfo){
			push('/auth');
		}
		if(!$data){
			const getData = async() => {
				const BASE_URL = 'https://memoriser-strapi.herokuapp.com';
				const userName = $userInfo.userName;
				const sentenceApiCall = fetch(`${BASE_URL}/sentences?userRef.username=${userName}`);
				const wordsApiCall = fetch(`${BASE_URL}/words?userRef.username=${userName}`);
				const response = await Promise.all([sentenceApiCall, wordsApiCall]);
				const tempData = await Promise.all(response.map((r) => r.json()));
				data.set(tempData);
				console.log("data is", $data)
			}
			getData()
		}
	})
	const handleLogout = () => {
		deleteCookie('userToken');
		window.location = '/';
	};
	const refreshWords = async () => {
		const BASE_URL = 'https://memoriser-strapi.herokuapp.com';
		const wordsApiCall = await fetch(`${BASE_URL}/words?userRef.username=${userName}`);
		allWords = await wordsApiCall.json();
	};
	const refreshSentences = async () => {
		const BASE_URL = 'https://memoriser-strapi.herokuapp.com';
		const sentenceApiCall = fetch(`${BASE_URL}/sentences?userRef.username=${userName}`);
		allSentences = await sentenceApiCall.json();
	};
</script>

<div>
	<h2>Profile Info</h2>
	<button on:click={handleLogout}>Logout</button>
	<p>Username = {userName}</p>
	{#if allSentences}
		<Accordion data={allSentences} header="All Sentences" {refreshWords} {refreshSentences} />
	{/if}
	{#if allWords}
		<Accordion data={allWords} header="All Words" {refreshWords} {refreshSentences} />
	{/if}
</div>
