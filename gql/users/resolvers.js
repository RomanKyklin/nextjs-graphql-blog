import bcrypt from "bcrypt";
import jws from "jsonwebtoken";

export const resolvers = {
    Query: {
        users(parent, args, {knex}) {
            return knex('users').select('*');
        },
        async login(parent, args, {knex}) {
            const {login, password} = args;
            const user = await knex('users').where({login}).first();
            const isPassportTheSame = bcrypt.compareSync(password, user && user.password);

            if (isPassportTheSame) {
                const claims = {sub: user.id, login: user.login};
                const jwt = jws.sign(claims, process.env.SECRET, {expiresIn: '1h'});
                console.log(jwt);
            }
        }
    },
    Mutation: {
        async createUser(parent, args, {knex}) {
            const {login, password} = args;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = await knex('users').insert({login, password: hashedPassword}).returning('*');
            const {id} = query[0];
            return {
                id,
                login
            };
        },
    }
};
