function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function task1() {
    let arr = [];
    for (let i = 0;i < 10; i++){
        arr[i] = getRandomArbitrary(100, 200);
    }
    document.getElementById("result-block").innerText = arr;
}

const insertionSort = arr => {
    for (let i = 1, l = arr.length; i < l; i++) {
        const current = arr[i];
        let j = i;
        while (j > 0 && arr[j - 1] > current) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = current;
    }
    return arr;
};

function task2() {

    let array = [1,3,5,6,2,4,12,7,9,8,11,10,0];
    document.getElementById("result-block").innerText =
        "Result: " + (insertionSort(array));
}

