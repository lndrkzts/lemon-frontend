const getNumberFromResultsCountText = (resultsCountText) => {
    const strNumber = resultsCountText.split(' ')[0].replace('+', '');
    return parseInt(strNumber);
}

module.exports = {
    getNumberFromResultsCountText
}