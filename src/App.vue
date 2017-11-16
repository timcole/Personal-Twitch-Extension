<template>
	<div id="twitchExt">
		<router-view></router-view>
		<ul class="nav dp-1">
			<router-link tag="li" to="/"><img src="./assets/socialblade.png" alt="sb"/>Stats</router-link>
			<router-link tag="li" to="/music"><i class="material-icons">music_note</i>Music</router-link>
			<!-- <router-link tag="li" to="/chatters"><i class="material-icons">list</i>Top Chatters</router-link> -->
		</ul>
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Material+Icons|Roboto:100,500,700');

	html, body {
		background: #1F232D;
		font-family: 'Roboto', sans-serif;
		color: #eee;
		height: 100%;
	}

	* {
		padding: 0;
		margin: 0;
	}

	ul.nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #202530;
		list-style: none;
		z-index: 2;
	}

	ul.nav li {
		display: inline-block;
		text-align: center;
		margin: 0 -1.5px;
		padding: 3px 0;
		/*width: 33.33%;*/
		width: 50%;
		font-size: 0.75em;
		cursor: pointer;
		font-weight: 100;
		border-top: 2px solid #202530;
	}

	ul.nav li i {
		display: block;
	}

	ul.nav li img {
		display: block;
		margin: 7px auto;
		width: 20px;
	}

	ul.nav li.router-link-exact-active {
		background: #1d212b;
		border-top: 2px solid #2D8CCE;
	}

	div[data-tab] {
		max-height: calc(100vh - 50px) !important;
		overflow: auto;
	}

	.dp-1 {
		-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
		box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
	}

	::-webkit-scrollbar {
		width: 2px;
		height: 2px;
	}
	::-webkit-scrollbar-button {
		width: 0px;
		height: 0px;
	}
	::-webkit-scrollbar-thumb {
		background: #2D8CCE;
		border: 0px none #2D8CCE;
		border-radius: 0px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #2D8CCE;
	}
	::-webkit-scrollbar-thumb:active {
		background: #2D8CCE;
	}
	::-webkit-scrollbar-track {
		background: #1d212b;
		border: 0px none #2D8CCE;
		border-radius: 0px;
	}
	::-webkit-scrollbar-track:hover {
		background: #1d212b;
	}
	::-webkit-scrollbar-track:active {
		background: #1d212b;
	}
	::-webkit-scrollbar-corner {
		background: transparent;
	}
</style>
