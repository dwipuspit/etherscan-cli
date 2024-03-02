require("dotenv").config();
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
TOKEN = process.env.KEY;

readline.question("Input Address: ", address => {
    checkBalance(address);
    readline.close();
})
export async function checkBalance(address) {
    try {
        const res = await fetch("https://api.etherscan.io/api?module=account&action=balance&address=" + address + "&tag=latest&apikey=" + TOKEN);
        if (!res.ok) throw Error("getting error")
        const data = await res.json();
        const getWei = data.result;
        data.result = weiToETH(getWei);
        return console.log("Your balance: " + data.result + " ETH")
    } catch (error) {
        console.log({ error });
    }
}
function weiToETH(balance) {
    return balance / 1000000000000000000; // 1 Eth
}