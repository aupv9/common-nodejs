import App from "./src/app";
import * as http from "http";
import { config } from "dotenv";

const PORT = process.env.PORT || 3050;

const server: http.Server = App.listen(PORT, () => {
    config();
    console.log(`Server is running on port ${PORT}`);
})

process.on('SIGINT', () => {
    server.close();
    console.log("Server closed");
    process.exit(0);
})