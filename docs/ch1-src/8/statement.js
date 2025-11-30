/**
 * 重构步骤 8: 移除 volumeCredits 变量
 * 
 * 应用"拆分循环(227)" + "移动语句(223)" + "提炼函数(106)" + "内联变量(123)"：
 * - 拆分循环，将 volumeCredits 的累加分离
 * - 提炼 totalVolumeCredits 函数
 * - 内联 volumeCredits 变量
 */

import { plays, invoices } from "./datas.js";


function statement(invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    // volumeCredits 变量被内联，直接调用 totalVolumeCredits()

    result += `Amount owed is ${usd(totalAmount)}\n`;
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

    // 提炼出的函数：计算总观众量积分
    function totalVolumeCredits() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }
}

// 运行测试
for (const invoice of invoices) {
    console.log(statement(invoice, plays));
}
