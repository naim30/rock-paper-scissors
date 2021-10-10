// const modelParams = {
//   flipHorizontal: true,
//   imageScaleFactor: 0.7,
//   maxNumBoxes: 2,
//   iouThreshold: 0.5,
//   scoreThreshold: 0.6,
// };

const modelParams = {
  flipHorizontal: false,
  outputStride: 16,
  imageScaleFactor: 1,
  maxNumBoxes: 20,
  iouThreshold: 0.2,
  scoreThreshold: 0.6,
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
let model;

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;
        setInterval(runDetection, 1000);
      },
      (err) => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then((predictions) => {
    console.log(predictions);
    model.renderPredictions(predictions, canvas, context, video);
    if (predictions.length > 0) {
      audio.play();
    }
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});
