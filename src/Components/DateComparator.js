
export default function compareDates(itemA, itemB) {
    let partsA = itemA.date.split(".");
    console.log(itemA, itemB);
    let partsB = itemB.date.split(".");

    let newA = partsA[2] + partsA[1] + partsA[0];
    let newB = partsB[2] + partsB[1] + partsB[0];

    if (newA > newB) {
        return -1
    } else if (newA === newB) {
        return 0
    } else if (newA < newB) {
        return 1
    }
}