import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("69c3aeb5001e29bce67a");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
