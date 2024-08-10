const express = require("express");
const path = require("path");
const cors = require("cors");
const instagramProfile = require("./instagram");

const app = express();
const port = 3333;

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// Ubah rute untuk menggunakan path parameter
app.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).send({ error: "Username is required" });
  }
  try {
    const data = await instagramProfile(username);
    if (data.data.length === 0) {
      return res.send({
        status: "OK",
        data: [
          {
            name: "Profile not found",
            description: "",
            url_name: "",
            profilePicUrl: "",
          },
        ],
      });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.send({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
