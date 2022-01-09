import { calc_sum_digits } from "./sums.js"

// lazy
function get(id) {
    return document.getElementById(id);
}
// lazy lazy
function val(id) {
    const n = get(id);
    const v = n.nodeValue ? n.nodeValue : n.value;
    if(Number.isInteger(v)) {
        return Number.parseInt(v);
    }
    return v;
}
function br(node) {
    node.appendChild(document.createElement("br"));
}
function txt(node,text) {
    node.appendChild(document.createTextNode(text));
}
/** Clear all children from this element. */
function clear(id) {
    const node = get(id);
    while(node.firstChild)
        node.removeChild(node.firstChild);
}

function render_sum(total, N, list_o_combos) {
    clear("sum_results");
    const cont = get("sum_results");
    txt(cont,`Total: ${total} / N: ${N}`);
    br(cont);
    if(list_o_combos.length == 0) {
        txt(cont,"no results") ;
        return;
    }
    for(let combo of list_o_combos) {
        txt(cont,combo.join(", "));
        br(cont);
    }
}

function calc_sum() {
    const total = val("sum_total");
    const N = val("sum_N");
    const results = calc_sum_digits(total, N);
    render_sum(total,N,results);
}

function register_handlers() {
    get("sum_button").onclick = calc_sum;
}

document.addEventListener("DOMContentLoaded", register_handlers);