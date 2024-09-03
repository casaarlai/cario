export const youtubeFunctionString = `
// Begin Function
const hash = args[0];
const channelId = args[1];
const videoId = args[2];

if (!secrets.apiKey) {
  throw Error(
    "YOUTUBE_API_KEY required"
  );
}

let youtubeRequest = Functions.makeHttpRequest({
  url: "https://youtube.googleapis.com/youtube/v3/videos",
  method: "GET",
  params: {
    part: "snippet",
    id: videoId,
    key: secrets.apiKey
  },
});


const youtubeResponse = await youtubeRequest;

if (youtubeResponse.error) {
  throw new Error("Youtube error");
}

if (youtubeResponse.data && youtubeResponse.data.items && youtubeResponse.data.items[0]) {
  const description = youtubeResponse.data.items[0].snippet.description;
  const channelIdFromVid = youtubeResponse.data.items[0].snippet.channelId;
  const walletIndex = description.indexOf(hash);
  const channelIndex = channelIdFromVid.indexOf(channelId);
  const resultInt = walletIndex !== -1 ? 1 : 0;
  const channelResult = channelIndex !== -1 ? 1 : 0;
  return Functions.encodeUint256(resultInt*channelResult);
} else {
  throw new Error("Youtube video  not found");
}



// End Function

`;