import { calc_sum_digits } from "./sums.js"

// lazy
function get(id) {
    return document.getElementById(id);
}
function int(v) {
    return parseInt(v);
}
// lazy lazy
function val(id) {
    const n = get(id);
    const v = n.nodeValue ? n.nodeValue : n.value;
    return int(v);
}
// lazy, lazy
function list(id) {
    const n = get(id);
    const vals = n.nodeValue ? n.nodeValue : n.value;
    if(!vals) return [];
    if(!vals.includes(',')) {
        return [int(vals)];
    }
    return vals.split(',').map(int);
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

function get_focusable_els() {
    return get("sum_cont").querySelectorAll(["input","button"]);
}

// rendering stuffs below this line //

function render_sum(total,N,banned,must_use,max_digit,list_o_combos) {
    clear("sum_results");
    const cont = get("sum_results");
    txt(cont,`Total: ${total} / N: ${N}`);
    br(cont);
    if(banned?.length) {
        txt(cont, `- Banned: ${banned.join(', ')}`);
        br(cont);
    }
    if(must_use?.length) {
        txt(cont, `- Must use: ${must_use.join(', ')}`);
        br(cont);
    }
    if(max_digit && max_digit != 9) {
        txt(cont, `- Max digit: ${max_digit}`);
        br(cont);
    }
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
    const banned = list("sum_banned");
    const must_use = list("sum_must_include");
    const max_digit = val("sum_max_digit");
    const results = calc_sum_digits(total, N, must_use, banned, max_digit);
    render_sum(total,N,banned,must_use,max_digit,results);
}

function register_handlers() {
    get("sum_button").onclick = calc_sum;
    const focus_els = get_focusable_els();
    document.addEventListener("keydown", (e) => {
        const focused = document.activeElement;
        if(e.key != "Enter") {
            return;
        }
        e.preventDefault();
        if(focused.tagName == "BUTTON") {
            focused.click();
            return;
        }
        let idx_next = null;
        for(let [idx,el] of focus_els.entries()) {
            if(el == focused) {
                idx_next = idx + 1;
                break;
            }
        }
        if(idx_next == null) return;
        focus_els[idx_next]?.focus();
    });
}

document.addEventListener("DOMContentLoaded", register_handlers);