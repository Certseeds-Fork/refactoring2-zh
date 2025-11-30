/**
 * 重构步骤 15: 创建 enrichPerformance 函数
 * 
 * 使用 map 和 enrichPerformance 函数来填充 performance 数据
 * 目前只是返回一个 aPerformance 对象的副本
 * 返回副本是为了保持数据不可变(immutable)
 */

import { plays, invoices } from "./datas.js";


function statement(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    // 使用 map 和 enrichPerformance 来处理每个 performance
    statementData.performances = invoice.performances.map(enrichPerformance);
    return renderPlainText(statementData, plays);

    // 创建 enrichPerformance 函数，返回副本以保持数据不可变
    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        return result;
    }
}

function renderPlainText(data, plays) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
            result += amountFor(perf);
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
        if ("comedy" === playFor(aPerformance).type) {
            result += Math.floor(aPerformance.audience / 5);
        }
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (playFor(aPerformance).type) {
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
                throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }
}

// 运行测试
for (const invoice of invoices) {
    console.log(statement(invoice, plays));
}
