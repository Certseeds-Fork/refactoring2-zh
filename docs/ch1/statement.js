/**
 * 重构步骤 31: 处理 volumeCredits 的多态（1.9 节完成状态）
 * 
 * 完成"以多态取代条件表达式(272)"：
 * - 超类 volumeCredits 保留通用逻辑（检查观众数是否达到 30）
 * - 喜剧子类覆盖 volumeCredits，添加额外积分
 * - 这是最终版本
 */

import { plays, invoices } from "./datas.js";
import { createStatementData } from "./createStatementData.js";

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
    for (let perf of data.performances) {
        result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber / 100);
}

// 运行测试
console.log("===== Plain Text Statement =====");
for (const invoice of invoices) {
    console.log(statement(invoice, plays));
}

console.log("===== HTML Statement =====");
for (const invoice of invoices) {
    console.log(htmlStatement(invoice, plays));
}
