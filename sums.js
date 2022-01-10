function list_equal(a, b) {
    if(!(a.length == b.length)) return false;
    for(let i = 0; i < a.length; i++) {
        if(a[i] != b[i]) return false;
    }
    return true;
}
function set_equal(a, b) {
    // Not actually set equality. If there are duplicates in the list,
    //  also enforce that they must contain the same amount
    return a.length == b.length && list_equal(a.sort(),b.sort());
}
// is b subset of a?
function subset(a, b) {
    for(let _b of b) {
        if(!a.includes(_b)) return false;
    }
    return true;
}
/**
 * Calculate possible digits that make up given sum, assumes digits can't be repeated.
 * @param total
 * @param N Number of digits you must use
 * @param must_use (optional) List of digits that must be used
 * @param banned (optional) List of digits that are banned
 * @param max_digit (optional) Max digit, default 9
 * @param allow_repeats (optional) Allow repeats, default no
 * @returns List of possible sets of numbers.
 */
export function calc_sum_digits(total, N, must_use=[], banned=[], max_digit=9, allow_repeats=false) {
    max_digit = max_digit ? max_digit : 9;
    let max_digit_val = Math.min(max_digit,total-N+1);
    let possible_digits = [];
    let possible_combinations = [];
    for(let i = 1; i <= max_digit_val; i++) {
        if(banned.length && banned.includes(i)) continue;
        possible_digits.push(i);
        if(must_use.length && !must_use.includes(i)) continue;
        possible_combinations.push([i]);
    }
    for(let _ = 0; _ < N-1; _++) {
        possible_combinations = possible_combinations.flatMap((combo) => {
            let new_combos = [];
            for(let d of possible_digits) {
                if(!allow_repeats && combo.includes(d)) continue;
                new_combos.push([...combo, d]);
            }
            return new_combos;
        });
    }
    let out = [];
    for(let combo of possible_combinations) {
        if(combo.reduce((a,b) => a + b) != total) continue;
        if(must_use.length && !subset(combo,must_use)) continue;
        let new_combo = true;
        for(let o of out) {
            if(set_equal(combo,o)) {
                new_combo = false;
                break;
            }
        }
        if(new_combo) {
            out.push(combo);
        }
    }
    return out;
}