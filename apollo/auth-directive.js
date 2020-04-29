import {defaultFieldResolver} from "graphql";
import {SchemaDirectiveVisitor} from "graphql-tools";

export class isAuthenticated extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {resolve = defaultFieldResolver} = field;

        field.resolve = async function (...args) {
            if (!args[2].login) {
                throw new Error('You are not authorized for this ressource.')
            }
            return resolve.apply(this, args)
        }
    }
}
