<template>
	<div data-tab="music">
		<div class="playing" v-if="playing">
			<img class="dp-1" :src="art" />
			<div class="meta">
				<h1 v-if="!marquee" v-text="song">Song</h1>
				<marquee v-if="marquee" v-text="song">Song</marquee>
				<h2 v-text="artist">Artist</h2>
			</div>
		</div>
		<div class="not-playing" v-if="!playing">
			<i class="material-icons">pause</i>
			<p>Music is currently paused.</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Music',
	data () {
		return {
			playing: false,
			marquee: false,
			link: "",
			art: "",
			song: "",
			artist: ""
		}
	},
	created () { this.loadMusic() },
	updated () { this.marqueeCheck(); },
	beforeDestroy () { this.clearUpdates() },
	methods: {
		loadMusic () {
			var self = this;
			fetch('https://timcole.me/api/spotify/playing').then(function(response) {
				return response.json();
			}).then(function(j) {
				if (j.player.is_playing) {
					self.link = j.player.item.external_urls.spotify;
					self.art = j.player.item.album.images[0].url;
					if (self.song !== j.player.item.name) self.marquee = false;
					self.song = j.player.item.name;
					self.artist= j.player.item.artists[0].name;

					var timeLeft = j.player.item.duration_ms-j.player.progress_ms;
					var reload = (timeLeft > 5000 ? 5000 : timeLeft);

					self.playing = true
					self.update = setTimeout(self.loadMusic, reload);
				} else {
					self.playing = false
					self.update = setTimeout(self.loadMusic, 5000);
				}
			});
		},
		clearUpdates () {
			if (typeof this.update !== "undefined") clearTimeout(this.update);
		},
		marqueeCheck() {
			var a = document.getElementsByClassName("meta")[0];
			var b = document.getElementsByTagName("h1")[0];
			var c = document.getElementsByTagName("h2")[0];
			var d = document.getElementsByTagName("marquee")[0];

			if (!b) return;
			var aw = window.innerWidth;
			var bw = b.scrollWidth;

			this.marquee = (aw-bw !== 0);
		}
	}
}
</script>

<style>
	a { color: inherit; text-decoration: inherit; }
	div[data-tab="music"] .playing {
		z-index: 2;
		padding: 60px 0;
	}

	div[data-tab="music"] .playing img {
		vertical-align: middle;
		display: block;
		height: 200px;
		margin: 0 auto;
	}

	div[data-tab="music"] .playing .meta {
		vertical-align: middle;
		display: block;
		padding-top: 70px;
	}

	div[data-tab="music"] .playing .meta h1, div[data-tab="music"] .playing .meta marquee {
		vertical-align: middle;
		font-weight: bolder;
		font-size: 1.5rem;
		text-transform: uppercase;
		white-space: nowrap;
		text-align: center;
	}

	div[data-tab="music"] .playing .meta h2 {
		vertical-align: middle;
		font-weight: 100;
		font-size: 1rem;
		text-transform: uppercase;
		text-align: center;
	}

	div[data-tab="music"] .not-playing i {
		font-size: 10rem;
		text-align: center;
		display: block;
		padding: 75px 0 25px 0;
	}

	div[data-tab="music"] .not-playing p {
		text-align: center;
		font-weight: 100;
		font-size: 1rem;
		text-transform: uppercase;
	}
</style>
