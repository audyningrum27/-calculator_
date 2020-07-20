const calculatorScreen = document.querySelector('.calculator-screen')
let resetCount = 0;
let conditionalSecondNumber = 0;
let afterEqual = 0

let prevNumber = ''
let calculationOperator = ''
let currentNumber = ''


const updateScreen = (number) => {

    
    if (resetCount < 2) {
        calculatorScreen.value = number
        
    } else if (resetCount === 2) {
        if (conditionalSecondNumber === 1) {
            tmp = calculatorScreen.value
            conditionalSecondNumber = 0
        } else {
            tmp
        }
        
        calculatorScreen.value = tmp + number
    }
}


const updateOperator = (operator) => {
    
    if (resetCount < 2) {
        
        if (calculatorScreen.value) {
            
            tmp = calculatorScreen.value
            calculatorScreen.value = tmp + operator
            conditionalSecondNumber = 1
        } else {
            
            calculatorScreen.value = operator
        }
        resetCount = 2

    } else {
        
        calculatorScreen.value = operator
        resetCount = 0
    }

}

const numbers = document.querySelectorAll(".number");

const inputNumber = (number) => {
    if (currentNumber === '00') {
        currentNumber = ''
    }
    if (currentNumber === '0') {
        currentNumber = number
    } else if (afterEqual == 1) {
        currentNumber = number
        afterEqual = 0
    } else {
        currentNumber += number
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

const operators = document.querySelectorAll(".operator")

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
        updateOperator(event.target.value)
    })
})

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = ''
}

const equalSign = document.querySelector('.equal-sign')

const calculate = () => {
    let result = ''
    switch (calculationOperator) {
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case '-':
            result = parseFloat(prevNumber) - parseFloat(currentNumber)
            break
        case 'x':
            result = parseFloat(prevNumber) * parseFloat(currentNumber)
            break
        case '/':
            result = parseFloat(prevNumber) / parseFloat(currentNumber)
            break
        default:
            return
    }
    currentNumber = result
    calculationOperator = ''
}

const updateScreenEqual = (EqNum) => {
    calculatorScreen.value = EqNum
    afterEqual = 1
}

equalSign.addEventListener('click', () => {
    calculate()
    resetCount = 1
    updateScreenEqual(currentNumber)
})

const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = ''
}

const clearBtn = document.querySelector('.all-clear')

clearBtn.addEventListener('click', () => {
    clearAll()
    resetCount = 1
    updateScreenEqual(currentNumber)
})

const decimal = document.querySelector('.decimal')

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

const inputDecimal = (dot) => {
    if (currentNumber.includes('.')) {
        return
    }
    currentNumber += dot
}

const percen = document.querySelector('.percentage')

percen.addEventListener('click', () => {
    updateScreen(currentNumber + '%')
    if (currentNumber === '0') {
        return
    } else {
        currentNumber = currentNumber / 100
    }
})

const back = document.querySelector('.back')

back.addEventListener('click', () => {
    afterEqual = 0
    conditionalSecondNumber = 0
    currentNumber = currentNumber.toString()
    updateScreen(
        currentNumber = currentNumber.substr(0, currentNumber.length - 1)
    )
})
