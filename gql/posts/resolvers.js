export const resolvers = {
    Query: {
        posts(parent, args, {knex}) {
            return knex('post').select('*').orderBy('id');
        },
        post(parent, args, {knex}) {
            const {id} = args;
            return knex('post').select('*').where({id}).first();
        },
    },
    Post: {
        user(post, args, {knex}) {
            const {user_id} = post;
            return knex('users').select('*').where({'id': user_id}).first()
        }
    },
    Mutation: {
        async createPost(parent, args, {knex}) {
            const {title, text} = args;
            const result = await knex('post').insert({title, text}).returning('*');
            return result[0];
        },
        async deletePost(parent, args, {knex}) {
            const {id} = args;
            const result = await knex('post').where('id', id).del();
            return {
                status: result === 1
            };
        },
        async updatePost(parent, args, {knex}) {
            const {id, text, title} = args;
            const result = await knex('post')
                .where('id', '=', id)
                .update({text, title})
                .returning('*');
            return result[0];
        },
    }
};
