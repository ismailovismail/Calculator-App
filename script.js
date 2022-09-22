const displayInput=document.querySelector('.calculate-input')
const keys=document.querySelector('.calculate-keys')
let displayValue=0
let firstvalue=null
let operator=null

let waitingforSecondValue=false
updateDisplay()
function updateDisplay() {
    displayInput.value=displayValue
}

keys.addEventListener('click',function (e) {
    const element=e.target
    if (!element.matches('button'))  return

    if (element.classList.contains('operator')) {
         handleOperator(element.value)
         updateDisplay()
        return
    }
    if (element.classList.contains('decimal')) {
        inputDecimal()
        updateDisplay()
        return
    }
    if (element.classList.contains('clear')) {
         inputClear()
         updateDisplay()
        return
        
    }
    
    inputNumber(element.value)
    updateDisplay()

})
function handleOperator(nextOperator) {
    const value=parseFloat(displayValue)
     if (operator && waitingforSecondValue) {
        operator=nextOperator
        return
     }
    if (firstvalue===null) {
        firstvalue=value
    }else if (operator) {
        const result=calculate(firstvalue,value,operator)
        displayValue=`${parseFloat(result.toFixed(7))}`
        firstvalue=result
    }
    operator=nextOperator
    waitingforSecondValue=true
    
}

function calculate(first,second,operator) {
    if (operator==='+') {
        return first+second
    }else if (operator==='-') {
        return first-second
    }else if (operator==='*') {
        return first * second
    }else if (operator==='/') {
        return first / second
    }
    return second
}

function inputNumber(num) {
  if (waitingforSecondValue) {
    displayValue=num
    waitingforSecondValue=false
  }else{
    displayValue=displayValue===0? num:displayValue+num

  }    
}
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue+='.'
    }
}

function inputClear() {
    displayValue="0"
}

