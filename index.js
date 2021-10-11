const express = require("express");

const db  = require("./init-db")

// please start with `deta watch`
const app = express();

// 1) Just try to ping, which should work well
app.get("/ping", async (req, res) => {
  res.send("pong");
});

// Example payload for storing an "app" object 
// (not the `app` derived from express as an instance)
/*
{
	"name": "name here",
	"homeUrl": "https://www.somesite.com",
	"urls": [
		{
			"id": "0",
			"title": "Title of the page here!",
			"url": "https://www.somesite.com/title-of-the-page-here"
		}
	]
}
*/

// The below lines are taken & and updated
// from the example here:
// https://docs.deta.sh/docs/base/node_tutorial

/*
app.post('/users', async (req, res) => {
  const { name, age, hometown } = req.body;
  const toCreate = { name, age, hometown};
  const insertedUser = await db.put(toCreate); // put() will autogenerate a key for us
  res.status(201).json(insertedUser);
});
*/

// 2) Tried to emitate the lines above, only props are different,
// but the following is just returned after the PUT action has been done
app.post('/apps', async (req, res) => {
  const { name, homeUrl, urls } = req.body;
  const toCreate = { name, homeUrl, urls };
  const insertedApp = await db.put(toCreate);
  res.status(201).json(insertedApp);
});
// Result:
/*
{
  "key": "pekspnpad347"
}
*/

// 3) That's the GET case of what has been going wrong
// Please try to get any `app` from the Deta Base
// via https://<DETA-URL>.deta.dev/apps/
// which is pointing the following block:
app.get("/apps/:id", async (req, res) => {
  const { id } = req.params;
  const appFound = await db.get(id)
  if (appFound) {
    res.json(appFound);
  } else {
    res.status(404).json({"message": "app not found"});
  }
})
// Result is instead of the whole app object, just the key itself:
// {
//   "key": "pekspnpad347"
// }

module.exports = app;
