/**
 * 重构步骤 9: 移除 totalAmount 变量
 * 
 * 同样应用拆分循环 + 提炼函数 + 内联变量：
 * - 提炼 totalAmount 函数
 * - 内联 totalAmount 变量
 * 
 * Now in head of `1.5 进展：大量嵌套函数`
 */

import { plays, invoices } from "./datas.js";


function statement(invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    // totalAmount 变量被内联，直接调用 totalAmount()
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

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

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === playFor(aPerformance).type) {
            result += Math.floor(aPerformance.audience / 5);
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

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    // 提炼出的函数：计算总金额
    function totalAmount() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += amountFor(perf);
        }
        return result;
    }
}

// 运行测试
for (const invoice of invoices) {
    console.log(statement(invoice, plays));
}
