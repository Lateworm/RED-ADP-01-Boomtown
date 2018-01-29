const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `

	type User {
		id: ID
		fullname: String
		email: String
		bio: String
		shareditems: [Item]
		borrowedItems: [Item]
		imageurl: String
	}

	type Item {
		id: ID
		title: String
		description: String
		itemowner: User
		borrower: User
		imageurl: String
		available: Boolean
		tags: [Tag]
	}

	type Tag {
		id: ID
		title: String
	}

	input AddItemInput {
		itemowner: ID
		imageurl: String
		title: String
		description: String
		tags: [TagInput]
	}
	input TagInput {
		id: ID
		title: String
	}

	input UpdateItemInput {
		id: ID
		borrower: [BorrowerInput]
	}
	input BorrowerInput {
		id: ID
	}

	type Mutation {
		updateItem(updatedItem: UpdateItemInput): Item
		addItem(newItem: AddItemInput): Item
	}

	type Query {
		items: [Item]
		users: [User]
		userById(id: ID): User
		itemById(id: ID): Item
	}

`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
