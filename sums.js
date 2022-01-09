function set_equal(a, b) {
    return a.length == b.length && a.every(v => b.includes(v));
}
/**
 * Calculate possible digits that make up given sum, assumes digits can't be repeated.
 * @param total
 * @param N Number of digits you must use
 * @returns List of possible sets of numbers.
 */
export function calc_sum_digits(total, N) {
    let max_digit_val = Math.min(9,total-N+1);
    let possible_digits = [];
    let possible_combinations = [];
    for(let i = 1; i <= max_digit_val; i++) {
        possible_digits.push(i);
        possible_combinations.push([i]);
    }
    for(let _ = 0; _ < N-1; _++) {
        possible_combinations = possible_combinations.flatMap((combo) => {
            let new_combos = [];
            for(let d of possible_digits) {
                if(combo.includes(d)) continue;
                new_combos.push([...combo, d]);
            }
            return new_combos;
        });
    }
    let out = [];
    for(let combo of possible_combinations) {
        if(combo.reduce((a,b) => a + b) != total) continue;
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