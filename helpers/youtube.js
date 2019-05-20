const getUrl = (artistName, pieceName) => {
    let name = artistName === "artistes divers" ? "" : artistName;
    const youtubeApiKey = "AIzaSyB5Gb2TJc5CLw0GRFDHOJXoF-HlF0bCP-g";
    return `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&fields=items(id,snippet)&maxResults=10&q=${pieceName} ${name}&key=${youtubeApiKey}`;
}

const getFormattedVideosData = (data) => {
    return data.map((item) => {
        return {
            type: "video",
            videos: [
                {
                    videoId: item.id.videoId,
                    title: item.snippet.title
                }
            ]
        }
    });
}

export { getUrl, getFormattedVideosData };