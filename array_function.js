
function arrays(arr1, arr2) {
    
    arr1 = arr1.sort(function (a, b) { return a - b });
    let size = arr1.length + arr2.length;
    let m = "";
    for (let i = 0, len = size; i < len; i++) {
        let x1 = arr1[i];
        for (let i = 0, len = arr2.length; i < len; i++) {
            let x2 = arr2[i];
            if (x1 === x2) {
                if (m === "") {
                    m = m + x2;
                } else {
                    m = m + ', ' + x2;
                }
            }
        };
    };

    if (m === "") {
        return m = 'no duplicate values!';
    } else {
        return m;
    }
};

module.exports = arrays