import express from 'express';
import helmet from 'helmet';

// ----------- Modules ----------- //
import { getUser } from "./modules/routes/leveling/user.js";
import { pageNotFound } from "./modules/error/pagenotfound.js";
import { leaderboard } from "./modules/routes/leveling/leaderboard.js";
import { messageCreate } from "./modules/routes/leveling/messages.js";
import { linkUser } from "./modules/routes/leveling/link.js";
import { getDiscord } from "./modules/routes/leveling/getDiscord.js";
import { root } from "./modules/routes/leveling/root.js";
import { headers } from "./modules/middleware/headers.js";
import { requireType } from "./modules/middleware/type.js";
import { signup } from "./modules/routes/login/signup.js";


// ----------- Const ----------- //
export const app = express();
export const port = 8090;


// ----------- Middleware ----------- //
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(headers) // Headers


// ----------- ROUTES ----------- //

// ----- ROOT-PAGE ----- //
app.all('/', root);


// ----- GET ----- //

// Leaderboard
app.get('/api/leaderboard', leaderboard);

// getDiscord
app.get('/api/getDiscord/:author_id', getDiscord);

// ----- POST ----- //

// SignUp
app.post('/api/auth/signup', await requireType(), signup);

// Messages
app.post('/api/message', await requireType(), messageCreate);

// Link
app.post('/api/link', await requireType(), linkUser);

// User
app.get('/api/user', getUser);

// ----- ERROR ----- //

// PageNotFound
app.use(pageNotFound);


// ----------- INIT ----------- //
app.listen(
    port, '0.0.0.0', 0,
    function () {
        console.log(`Server listening on port ${port}\n`);
    }
);