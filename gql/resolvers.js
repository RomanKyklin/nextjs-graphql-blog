import {resolvers as postsResolvers} from "./posts/resolvers";
import {resolvers as usersResolvers} from "./users/resolvers";

const Query = {...postsResolvers.Query, ...usersResolvers.Query};
const Mutation = {...postsResolvers.Mutation, ...usersResolvers.Mutation};
const Post = {...postsResolvers.Post};
export const resolvers = {Query, Mutation, Post};
