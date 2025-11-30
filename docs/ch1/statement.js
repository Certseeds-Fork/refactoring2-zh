/**
 * 重构步骤 27: 引入工厂函数
 * 
 * 应用"以工厂函数取代构造函数(334)"：
 * - 创建 createPerformanceCalculator 工厂函数
 * - JavaScript 的构造函数无法返回子类，需要用普通函数
 * - 这为后续引入子类做准备
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
