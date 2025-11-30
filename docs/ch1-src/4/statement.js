/**
 * 重构步骤 4: 移除 play 变量
 * 
 * 应用"以查询取代临时变量(178)"：
 * - 提炼 playFor 函数
 * - 内联 play 变量，改为直接调用 playFor(perf)
 */

import { plays, invoices } from "./datas.js";


function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
        // 移除 play 变量，改为直接调用 playFor(perf)
        let thisAmount = amountFor(perf, playFor(perf));

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        // print line for this order
        result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    // 新提炼的函数：查询 play 数据
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance, play) {
        let result = 0;
        switch (play.type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
        return result;
    }
}

// 运行测试
for (const invoice of invoices) {
    console.log(statement(invoice, plays));
}
