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

	input TagInput {
		id: ID
		title: String
	}

	input AddItemInput {
		imageurl: String
		title: String
		description: String
		tags: [TagInput]
	}

	input UpdateItemInput {
		id: ID
		borrower: ID
	}

	type Mutation {
		addItem(newItem: AddItemInput): Item
		updateItem(newItem: UpdateItemInput): Item
	}

	type Query {
		items: [Item]
		users: [User]
		user(id: ID): User
		item(id: ID): Item
	}

`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});