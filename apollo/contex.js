import * as jwt from "jsonwebtoken";
import {knexClient} from "../knex/clent";

export function context({req}) {
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (token) {
        try {
            token = jwt.verify(token, process.env.SECRET)
        } catch (error) {
            throw new Error(
                'Authentication token is invalid, please log in.'
            )
        }
    }

    return {
        login: token ? token.login : null,
        id: token ? token.sub : null,
        knex: knexClient
    }
};
