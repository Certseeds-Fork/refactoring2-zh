/**
 * 重构步骤 28: 创建子类结构
 * 
 * 应用"以子类取代类型码(362)"：
 * - 创建 TragedyCalculator 和 ComedyCalculator 子类
 * - 工厂函数根据 play.type 返回对应的子类实例
 * - 此时子类还没有覆盖任何方法
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
