import Client from "pg";
console.log(Client.Client)
export const client = new Client.Client({
    user: 'postgres',
    password:'@souvede2',
    host: "/var/run/postgresql",
    database: "profile_stock"
})
