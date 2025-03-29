# Stremio Youtube Addon

This is a repo for an addon for Stremio to catalogue and stream the movies, series and anime which are uploaded to youtube.
Disclaimer - Few Youtube Videos are not embeddable so they might not work.
It has been deployed to [url](https://stremio-addon-763786649023.us-central1.run.app/)

## Background

Last Year, I made the switch from torrent to stremio.
It has been great going for Popular hollywood media.
But me being from Asia, I have seen a dearth of Indian and other related media on stremio.
And if available Few Seeders were available to stream
But these movies were freely available on youtube to stream.
So, I am trying to catalogue these youtube
I would like the project to be extended to various other media that are available on youtube even Skits channels

## Contributing

Most Important to these catalogues is the YtID for the video
The Addon is not currently published as It is not that polished like other addons.
But It can be still added using the above link

### Language and Architecture

The addon's SDK is written in JavaScript.
The scripts to automate addons are written in Python.
The Template for the addon is [given here](https://github.com/Stremio/addon-helloworld)
Add more streams to the data.json and series.json

### Hosting

This addon is being hosted on Google Cloud run via Docker [image](https://hub.docker.com/repository/docker/shaswat51/stremio-addon)
The image has been added to [artifact registry](gcr.io/stremio-youtube-media/stremio-addon)

### Python Script

This repo contains two python scripts to write json object to data2.json and series2.json files
We need to append these object to the end of data.json and series.json, respectively to hold the streams data to use

## Todo

- [ ] Rename temporary files
- [ ] Create a Contributing Readme
- [ ] Add More Movies
- [ ] Add More Series
- [ ] Create a stream for Anime
- [ ] Add More Anime
- [ ] Create a stream for Cable Channels
- [ ] Add More Cable Channels
- [ ] Create a Icon and Banner for the Addon
- [ ] Update the script to parse the playlist to yt URL
- [ ] Update the script to detect and clean embedded Link
- [ ] Add a description to the Addon
- [ ] Add a license to the Addon

## Ideas and Feedback

Contact me on Github or [email](mailto:palmtrees2308@protonmail.com) about any Idea or Feedback
Feel Free to add issues or pull request
