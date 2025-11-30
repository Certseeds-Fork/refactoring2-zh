/**
 * 重构步骤 3: 重命名变量
 * 
 * - thisAmount 重命名为 result（函数返回值命名规范）
 * - perf 重命名为 aPerformance（类型标注命名规范）
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
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    // 重命名后的函数：
    // - thisAmount -> result（返回值命名规范）
    // - perf -> aPerformance（类型标注规范）
    function amountFor(aPerformance, play) {
        let result = 0;  // 改名: thisAmount -> result
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
