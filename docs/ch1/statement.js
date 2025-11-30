/**
 * 重构步骤 22: 添加 htmlStatement（1.7 节完成状态）
 * 
 * 现在添加 HTML 版本非常简单：
 * - 复用 createStatementData 计算数据
 * - 只需要编写新的 renderHtml 函数
 * - usd 函数搬移到顶层作用域以便复用
 */

import { plays, invoices } from "./datas.js";
import { createStatementData } from "./createStatementData.js";

// ========== statement.js ==========

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

// 新增：HTML 版本的详单
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

// 新增：HTML 渲染函数
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

// usd 搬移到顶层作用域，以便 renderHtml 也能访问
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
