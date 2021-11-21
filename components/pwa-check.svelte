<svelte:options tag="pwa-check"/>

<script>
import './nav-bar.svelte';

let name = '';
let result = '';

async function checkPwa () {
	if(!name) {
		throw new Error('name is required');
	}

	name = name.trim().replace(/(http|https)\:\/\//, '');

	result = 'loading...'

	try {
		const response = await fetch(`/api/pwa-checker?url=${name}`);
		const json = await response.json();
		result = JSON.stringify(json, null, 2)
	} catch (err) {
		result = err.message;
	}

}

</script>

<nav-bar />

<main>
	<section>
		<input bind:value={name} placeholder="Please enter your pwa website">
		<button on:click={checkPwa}>Go</button>
	</section>
	<section>
		<textarea bind:value={result} />
	</section>
	
</main>

<style>
	main {
		text-align: center;
		margin: 0;		

	}

	section {
		margin: 20px;

	}

	input {
		width: 400px;
		padding:20px;
		font-size: 20px;
	}

	button {
		width: 150px;
		padding:20px;
		font-size: 20px;
	}

	textarea {
		font-size: 15px;
		width: 600px;
		height: 500px;
	}

</style>