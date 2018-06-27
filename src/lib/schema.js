import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
} from 'graphql';

import Pet from './types/Pet';
import Toy from './types/Toy';
import ToyInput from './types/ToyInput';
import { getPets, getPetById, getToys, getToyById, createToy } from './db';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            pets: {
                type: new GraphQLNonNull(new GraphQLList(Pet)),
                resolve: () => getPets(),
            },
            petById: {
                type: Pet,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: (parent, args) => getPetById(args.id),
            },
            toys: {
                type: new GraphQLNonNull(new GraphQLList(Toy)),
                resolve: () => getToys(),
            },
            toyById: {
                type: Toy,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: (parent, args) => getToyById(args.id),
            },
        },
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createToy: {
                type: new GraphQLNonNull(Toy),
                args: {
                    toyData: { type: new GraphQLNonNull(ToyInput) },
                },
                resolve: (parent, { toyData }) => createToy(toyData),
            },
        },
    }),
});
