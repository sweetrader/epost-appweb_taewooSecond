export function numberToKorean(number) {
  const inputNumber = number < 0 ? false : number
  const unitWords = ['', '만', '억', '조', '경']
  const splitUnit = 10000
  const splitCount = unitWords.length
  const resultArray = []
  let resultString = ''

  for (let i = 0; i < splitCount; i++) {
    let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i)
    unitResult = Math.floor(unitResult)
    if (unitResult > 0) {
      resultArray[i] = unitResult
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue
    resultString = String(addComma(resultArray[i])) + unitWords[i] + resultString
  }
  return resultString
}

export function addComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getAmount(val) {
  var s = String('' + val.replace(/,/g, ''))
  var result = ''
  var num = 0
  for (var i = s.length - 1; i >= 0; i--) {
    result = s[i] + result
    if (num % 3 === 2 && i !== 0) {
      result = ',' + result
    }
    num++
  }
  return result
}
