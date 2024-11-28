// Sorting functions
function selectionSort(arr) {
    let array = [...arr];
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    return array;
}

function insertionSort(arr) {
    let array = [...arr];
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    return array;
}

function bubbleSort(arr) {
    let array = [...arr];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return [...result, ...left, ...right];
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

function heapSort(arr) {
    let array = [...arr];

    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }

    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array, array.length, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        heapify(array, i, 0);
    }

    return array;
}


function shellSort(arr, sequence = "shell") {
    let array = [...arr];
    let gaps;

    // Выбор последовательности
    if (sequence === "shell") {
        // Классическая последовательность Шелла: n/2, n/4, ..., 1
        gaps = [];
        for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
            gaps.push(gap);
        }
    } else if (sequence === "hibbard") {
        // Последовательность Хиббарда: 1, 3, 7, ..., 2^k - 1
        gaps = [];
        let k = 1;
        while ((2 ** k - 1) < array.length) {
            gaps.push(2 ** k - 1);
            k++;
        }
        gaps.reverse(); // Сортировка в убывающем порядке
    } else if (sequence === "pratt") {
        // Последовательность Пратта: комбинация степеней 2 и 3
        gaps = [];
        let k = 1, l = 1;
        while (2 ** k < array.length || 3 ** l < array.length) {
            if (2 ** k < array.length) gaps.push(2 ** k);
            if (3 ** l < array.length) gaps.push(3 ** l);
            k++;
            l++;
        }
        gaps = Array.from(new Set(gaps)).sort((a, b) => b - a); // Уникальные и отсортированные
    } else {
        throw new Error("Unknown sequence type");
    }

    // Сортировка по выбранной последовательности
    for (let gap of gaps) {
        for (let i = gap; i < array.length; i++) {
            let temp = array[i];
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }
            array[j] = temp;
        }
    }
    return array;
}



// Measure execution time
function measureTime(sortFunction, array) {
    const start = performance.now();
    sortFunction(array);
    return performance.now() - start;
}

// Algorithms
const algorithms = {
    "Selection Sort": selectionSort,
    "Insertion Sort": insertionSort,
    "Bubble Sort": bubbleSort,
    "Merge Sort": mergeSort,
    "Quick Sort": quickSort,
    "Heap Sort": heapSort,
    "Shell Sort": shellSort
};

// Execution

for (const [name, sortFunction] of Object.entries(algorithms)) {
    console.log(`                   ${name}:`);
    for(let i = 1; i < 5000; i+=500){
    // Test arrays
        const size = i;
        
        const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * size));
        const sortedArray = [...randomArray].sort((a, b) => a - b);
        const reversedArray = [...sortedArray].reverse();
        const almostSortedArray = [...sortedArray.slice(0, Math.floor(size * 0.9)), ...randomArray.slice(0, Math.floor(size * 0.1))];

        console.log(`Execution times for arrays of size ${size}:`);
        console.log(`  Random: ${measureTime(sortFunction, randomArray).toFixed(6)} ms`);
        console.log(`  Sorted: ${measureTime(sortFunction, sortedArray).toFixed(6)} ms`);
        console.log(`  Reversed: ${measureTime(sortFunction, reversedArray).toFixed(6)} ms`);
        console.log(`  Almost Sorted: ${measureTime(sortFunction, almostSortedArray).toFixed(6)} ms`);
    }
}
