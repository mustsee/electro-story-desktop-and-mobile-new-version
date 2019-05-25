const baseYoutubeURL = "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = "AIzaSyB5Gb2TJc5CLw0GRFDHOJXoF-HlF0bCP-g";

const getSearchUrl = (artistName, pieceName) => {
    let name = artistName === "artistes divers" ? "" : artistName;
    return `${baseYoutubeURL}/search?part=snippet&fields=items(id,snippet)&maxResults=10&q=${pieceName} ${name}&key=${youtubeApiKey}`;
}

const getPlaylistItemsUrl = (playlistId) => {
    return `${baseYoutubeURL}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=25&key=${youtubeApiKey}`;
}

const getFormattedVideoData = (item) => {
    return {
        type: "video",
        videos: [
            {
                videoId: item.id.videoId,
                title: item.snippet.title
            }
        ]
    }
}

const getFormattedPlaylistData = (res, playlistId) => {
    const playlistItems = res.data.items;
    const length = playlistItems.length;
    const items = playlistItems.map((item, i) => {
        return {
            type: "playlistItem",
            position: item.snippet.position,
            videoId: item.contentDetails.videoId,
            title: item.snippet.title
        }
    });
    return {
        type: "playlist",
        length,
        playlistId,
        videos: items
    };
}

export { getSearchUrl, getFormattedVideoData, getPlaylistItemsUrl, getFormattedPlaylistData };