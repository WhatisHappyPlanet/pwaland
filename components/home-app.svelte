<svelte:options tag="home-app"/>
<script>

import './nav-bar.svelte';
import data from '../data/pwa.json'

function sortLetter(input) {
	return input.sort((a,b)=> {
		if(a.title < b.title) {
			return -1;
		} else if(a.title === b.title) {
			return 0;
		} else {
			return 1;
		}
	})
}

function onImgError(e) {
	e.target.src = '/noimage.png';
}

const pwalist = sortLetter(data);

</script>

<nav-bar />

<main>
	
	<section class="wrap">
		{#each pwalist as app, index}
			<a href={app.link} class="box" key={index}>
				<img src={app.icon} alt={app.title} on:error={onImgError} />
				<span>{app.title}</span>
			</a>
		{/each}
		
	</section>
</main>

<style>
	main {
		text-align: center;
		margin: 0;
	}

	.wrap {
		display: flex;
		flex-flow: row wrap;
		align-content: flex-start;
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		margin: 18px 0;
		flex: 0 0 33%;
		transition: all 0.5s;
	}

	.box:hover {
		transform: scale(1.2);
	}

	.box img {
		width: 48px;
		height: 48px;
		margin-bottom: 10px;
	}

	.box span {
		color: rgb(77 61 146);
		word-break: normal;
		width:80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
	}

	a {
		text-decoration: none;
	}

	@media (min-width: 640px) {
		.box {
			margin: 18px;
			flex: 0;
		}
	}

</style>