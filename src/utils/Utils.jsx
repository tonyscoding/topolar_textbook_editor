export const languageCodeToId = (languageCode) => {
    const languageTable = {
        '001': '1',
        '002': '2',
        '003': '3',
        '004': '4',
        '005': '5',
        '006': '6',
        '007': '7',
        '008': '8',
        '009': '9',
        '010': '10',
        '011': '11',
        '012': '12',
        '013': '13',
        '014': '14',
        '015': '15',
    }
    return languageTable[languageCode];
}