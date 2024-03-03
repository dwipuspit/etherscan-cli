require("dotenv").config();
const axios = require("axios").default;
TOKEN = process.env.KEY;
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("Input Address: ", address => {
    checkBalance(address);
    readline.close();
})
async function checkBalance(address) {
    try {
        const res = await axios.get("https://api.etherscan.io/api?module=account&action=balance&address=" + address + "&tag=latest&apikey=" + TOKEN).then(res => res);
        const data = await res.data;
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

module.exports = { readline, checkBalance }