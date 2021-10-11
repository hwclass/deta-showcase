const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");

const db  = require("./init-db")

const app = express();

app.get("/ping", async (req, res) => {
  res.send("pong");
});

// store in Deta Base
const apps = [
  {
    id: 0,
    main: "https://www.sporx.com",
    pageId: 0,
    urls: [
      {
        id: 0,
        title: "Vitor Pereira: Mesut benim liderim!",
        url: "https://www.sporx.com/futbol/ekstra/vitor-pereira-mesut-benim-liderimSXGLQ55359SXQ?sira=5",
      },
    ],
  },
];

{
  "key": "zwaopiku6mvs",
  "value": "wg8b71gahpb7"
}

// Add new apps
// Params: name, home, urls
// POST payload: 
// {
// 	"name": "sporx",
// 	"homeUrl": "https://www.sporx.com",
// 	"urls": [
// 		{
// 			"id": "0",
// 			"title": "Vitor Pereira: Mesut benim liderim!",
// 			"url": "https://www.sporx.com/futbol/ekstra/vitor-pereira-mesut-benim-liderimSXGLQ55359SXQ?sira=5"
// 		}
// 	]
// }
app.post('/apps', async (req, res) => {
  const { name, homeUrl, urls } = req.body;
  const toCreate = { name, homeUrl, urls };
  const insertedApp = await db.put(toCreate);
  res.status(201).json(insertedApp);
});

// app.get("/apps/:id", async (req, res) => {
//   // get apps from Deta Base

//   const appId = req.params.id;

//   const { urls } = apps.filter((app) => app.id === parseInt(appId))[0];

//   // send urls to client to be listed for selection
//   res.send({ urls });
// });

app.get('/apps/:id', async (req, res) => {
  const { id } = req.params;
  const app = await db.insert(id);
  if (app) {
    res.json(app);
  } else {
    res.status(404).json({"message": "app not found"});
  }
});

app.post("/play", async (req, res) => {
  const { appId, urlId } = req.params;

  // TODO: get the apps & find the url filtered from them
  const app = await db.get({ id: appId })

  const url = apps
    .map((app) => app)[0]
    .urls.filter((url) => url.id === parseInt(urlId));

  // let payload = {
  //   status: 200,
  //   message: "Found the url, streaming the widget the the client.",
  //   appId: appId,
  //   urlId: urlId,
  //   url: url[0]
  // };

  const payload = app

  // payload.url = url[0];

  // if (!url || url.length === 0) {
  //   payload = {
  //     status: 204,
  //     message: "No content.",
  //   };
  // } else {
  //   payload.url = url;
  // }

  res.json(app);
});

// app.post("/apps", async (req, res) => {
//   const newApp = req.body 
  // {
  //   "name": "sporx",
  //   "homeUrl": "https://www.sporx.com",
  //   "urls": [
  //     {
  //       "id": "0",
  //       "title": "Vitor Pereira: Mesut benim liderim!",
  //       "url": "https://www.sporx.com/futbol/ekstra/vitor-pereira-mesut-benim-liderimSXGLQ55359SXQ?sira=5"
  //     }
  //   ]
  // }
//   db.put(newApp)
//   res.send({
//     status: 200,
//     message: "Data created"
//   })
// })

app.get("/apps/:id", async (req, res) => {
  const { id } = req.params;
  const app = await db.get(id)
  if (app) {
    res.json(app);
  } else {
    res.status(404).json({"message": "app not found"});
  }
})

module.exports = app;
