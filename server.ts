import App from "./src/app";
import * as http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3050;

const server: http.Server = App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

process.on('SIGINT', () => {
    server.close();
    console.log("Server closed");
    process.exit(0);
});
