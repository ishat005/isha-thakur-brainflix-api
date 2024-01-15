const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


router.get("/",(request, response)=>{
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json', 'utf-8'));
    const videos = videoData.map((video) => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        }
    })

    response.json(videos);
});

router.get("/:id",(request, response)=>{
   const videoData = JSON.parse(fs.readFileSync('./data/videos.json', 'utf-8'));
   const video = videoData.find((v) => v.id === request.params.id)

   if(!video) {
    return response.sendStatus(404);
   }

   response.json(video);
});

router.post("/", (request, response) => {
    const { title, image, description } = request.body;

    const id = uuidv4();

    const newVideo = {
        id, title, image, description,
        channel: 'test channel',
        views: 0,
        likes: 0,
        duration: '4:00',
        video: 'https://project-2-api.herokuapp.com/stream',
        timestamp: Date.now(),
        comments: []
    }

    const videoData = JSON.parse(fs.readFileSync('./data/videos.json', 'utf-8'));
    videoData.push(newVideo);
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoData));

    response.json(newVideo);
})

module.exports = router;