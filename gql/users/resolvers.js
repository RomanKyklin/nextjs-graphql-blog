import bcrypt from "bcrypt";
import jws from "jsonwebtoken";

export const resolvers = {
    Query: {
        users(parent, args, {knex}) {
            return knex('users').select('*');
        },
        currentUser(parent, args, {id, login, knex}) {
            return knex('users').where({login}).first();
        }
    },
    Mutation: {
        async login(parent, args, {knex}) {
            const {login, password} = args;
            const user = await knex('users').where({login}).first();
            const isPassportTheSame = user ? bcrypt.compareSync(password, user.password) : false;

            if (isPassportTheSame) {
                const claims = {sub: user.id, login: user.login};
                const token = jws.sign(claims, process.env.SECRET, {expiresIn: '1h'});
                return {token};
            }
            throw new Error('Login failed');
        },
        async createUser(parent, args, {knex}) {
            const {login, password} = args;
            const isUserExists = await knex('users').where({login}).first();

            if (isUserExists) {
                throw new Error('User already exists.')
            }

            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = await knex('users').insert({login, password: hashedPassword}).returning('*');
            const {id} = query[0];
            const claims = {sub: id, login};
            const token = jws.sign(claims, process.env.SECRET, {expiresIn: '1h'});
            return {token};
        },
    }
};
