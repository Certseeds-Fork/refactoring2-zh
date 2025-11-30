/**
 * 重构步骤 17: 将 amount 数据移入 enrichPerformance
 * 
 * - 将 amountFor 函数搬移到 statement 函数中
 * - 在 enrichPerformance 中添加 amount 字段
 * - 在 renderPlainText 中使用 perf.amount
 */

import { plays, invoices } from "./datas.js";


function statement(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    return renderPlainText(statementData, plays);

    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        // 将 amount 数据添加到 result 中
        result.amount = amountFor(result);
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    // amountFor 现在在 statement 函数中
    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
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
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }
        return result;
    }
}

function renderPlainText(data, plays) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        // 使用 perf.amount
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
            // 使用 perf.amount
            result += perf.amount;
        }
        return result;
    }

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of data.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        }
        return result;
    }
}

// 运行测试
for (const invoice of invoices) {
    console.log(statement(invoice, plays));
}
