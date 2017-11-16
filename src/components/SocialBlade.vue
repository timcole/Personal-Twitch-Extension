<template>
	<div data-tab="socialblade">
		<div class="summary" v-if="api !== null">
			<div class="row">
				<div class="col-4">
					<h1 :style="api.rank.grade.style" v-text="api.rank.grade.grade"></h1>
					<h2>Total Grade</h2>
				</div>
				<div class="col-4">
					<h1 v-text="Number(api.rank.rank).toLocaleString()"></h1>
					<h2>Follower Rank</h2>
				</div>
				<div class="col-4">
					<h1 v-text="Number(api.rank.vidviewrank).toLocaleString()"></h1>
					<h2>Views Rank</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<h1 v-text="Number(api.data.followersmonthgain).toLocaleString()"></h1>
					<h2>Followers Last 30 Days</h2>
				</div>
				<div class="col-6">
					<h1 v-text="Number(api.data.viewsmonthgain).toLocaleString()"></h1>
					<h2>Views Last 30 Days</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<h1 v-text="Number(api.data.avgdailyfollowers).toLocaleString()"></h1>
					<h2>Daily Follower Average</h2>
				</div>
				<div class="col-6">
					<h1 v-text="Number(api.data.avgdailyviews).toLocaleString()"></h1>
					<h2>Daily View Average</h2>
				</div>
			</div>
			<div class="row header">
				<div class="col-4"><h1>Date</h1></div>
				<div class="col-4"><h1>Followers</h1></div>
				<div class="col-4"><h1>Views</h1></div>
			</div>
		</div>
		<div class="data" v-if="api !== null">
			<div class="row table" v-for="data in api.render_data">
				<div class="col-4"><h1 v-text="data.date"></h1></div>
				<div class="col-4">
					<h1 :class="data.followers.class" v-text="data.followers.number"></h1>
				</div>
				<div class="col-4">
					<h1 :class="data.views.class" v-text="data.views.number"></h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SocialBlade',
	data () {
		return {
			api: null,
		}
	},
	created () { this.checkStats() },
	methods: {
		checkStats () {
			var self = this;
			fetch('https://tcole.me/twitch-stats').then(function(response) {
				return response.json();
			}).then(function(j) {
				j.rank.grade.style = j.rank.grade.display.match(/color:([^\"]*);/g)[0];
				j.render_data = [];

				for (var i = 0; i < 31; i++) {
					j.render_data.push({
						date: j.data_daily[i].date,
						followers: {
							number: self.posNov(Number(j.data_daily[i].followers-j.data_daily[i+1].followers), 0),
							class: self.posNov(Number(j.data_daily[i].followers-j.data_daily[i+1].followers), 1),
						},
						views: {
							number: self.posNov(Number(j.data_daily[i].views-j.data_daily[i+1].views), 0),
							class: self.posNov(Number(j.data_daily[i].views-j.data_daily[i+1].views), 1),
						}
					});
				}

				self.api = j;
			});
		},
		posNov (n, t) {
			if (t === 1) {
				return (n > 0 ? "positive" : n === 0 ? "neutral" : "negative");
			} else {
				return (n > 0 ? "+"+n.toLocaleString() : n === 0 ? "--" : n.toLocaleString());
			}
		}
	}
}

</script>

<style scoped>
	div[data-tab="socialblade"] .row {
		width: 100%;
	}
	div[data-tab="socialblade"] .row::after {
		content: "";
		clear: both;
		display: block;
	}

	div[data-tab="socialblade"] [class*="col-"] {
		float: left;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: .5em;
	}

	div[data-tab="socialblade"] .col-1 {width: 8.33%;}
	div[data-tab="socialblade"] .col-2 {width: 16.66%;}
	div[data-tab="socialblade"] .col-3 {width: 25%;}
	div[data-tab="socialblade"] .col-4 {width: 33.33%;}
	div[data-tab="socialblade"] .col-5 {width: 41.66%;}
	div[data-tab="socialblade"] .col-6 {width: 50%;}
	div[data-tab="socialblade"] .col-7 {width: 58.33%;}
	div[data-tab="socialblade"] .col-8 {width: 66.66%;}
	div[data-tab="socialblade"] .col-9 {width: 75%;}
	div[data-tab="socialblade"] .col-10 {width: 83.33%;}
	div[data-tab="socialblade"] .col-11 {width: 91.66%;}
	div[data-tab="socialblade"] .col-12 {width: 100%;}

	div[data-tab="socialblade"] .summary,
	div[data-tab="socialblade"] .data {
		text-align: center;
	}

	div[data-tab="socialblade"] .summary {
		position: fixed;
		display: block;
		width: 100%;
		background: #1F232D;
	}

	div[data-tab="socialblade"] .data {
		height: calc(100vh - 193px);
		margin-top: 193px;
	}

	div[data-tab="socialblade"] .summary [class*="col-"] {
		border: 1px solid #272c37;
	}

	div[data-tab="socialblade"] .summary h1 {
		font-size: 1rem;
		color: #bcc0c9;
	}

	div[data-tab="socialblade"] .summary h2 {
		font-size: .75em;
		color: #8a8d94;
	}

	div[data-tab="socialblade"] .data .table:nth-child(even) {
		background: #1b1f26;
	}

	div[data-tab="socialblade"] .summary .header {
		border-top: 2px solid #2D8CCE;
	}

	div[data-tab="socialblade"] .summary .header h1 {
		font-size: 1rem;
		color: #bcc0c9;
	}

	div[data-tab="socialblade"] .data h1 {
		font-size: .75rem;
		color: #bcc0c9;
	}

	div[data-tab="socialblade"] .data .positive { color: #3f8f50; }
	div[data-tab="socialblade"] .data .neutral { color: #8a8d94; }
	div[data-tab="socialblade"] .data .negative { color: #8f3f3f; }

</style>
