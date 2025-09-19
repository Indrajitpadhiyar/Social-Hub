import http from "http";
import "dotenv/config";
import app from "./app.js";
import messageRoutes from "./routes/message.route.js";
import friendRoutes from "./routes/friend.route.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use("/api/message", messageRoutes);
app.use("/api/friend", friendRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
