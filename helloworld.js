/**
 * JS hello world demo.
 * 
 */
let testPrintVar = function (name = 'zhengjin') {
    console.log(`hello world, ${name}`)
}


let testPathJoin = function () {
    const path = require('path')

    // path.join concatenates all given path segments together 
    // using the platform specific separator as a delimiter, then normalizes the resulting path.
    console.log('path.join:', path.join(__dirname, '../logs'))

    // path.resolve() process the sequence of paths from right to left, 
    // with each subsequent path prepended until an absolute path is constructed.
    console.log('path.resolve:', path.resolve(__dirname, '../logs', '/bar/bae'))
}


let testJsonLoad = function () {
    // auto convert json string (in file) to json object
    let loadJson = require('./package.json')
    console.log('load json:', typeof loadJson)
    console.log('project description:', loadJson.description)
}


let testPrintFuncName = function (fn) {
    console.log('funcion name:', fn.name)
    console.log('funcion name:', arguments[0].name)
}


let testFuncArgs = function () {
    let printFullName = function (firstName, lastName) {
        if (lastName) {
            console.log('hello', firstName, lastName)
            return
        }
        console.log('hello', firstName)
    }

    printFullName('henry')
    printFullName('zheng', 'jin')
}


let fnCaller = function (fn) {
    console.log('hello', fn())
}
let fnCallBack1 = function (text) {
    return text
}
let testCallBack = function () {
    // must be within the same context
    let fnCallBack2 = function () {
        return nameText
    }

    const nameText = 'zhengjin'
    // #1, call by anonymous function
    fnCaller(function () {
        return nameText
    })
    // #2, call by function
    fnCaller(() => fnCallBack1(nameText))
    // #3, call by function variable
    fnCaller(fnCallBack2)
}


let testSelfRunFunc = function () {
    (function () {
        console.log('self run function without name.')
    })();
    (function selfRun () {
        console.log('self run function with name.')
    })()
}


let testObject = function testObject () {
    // #1
    let tmpBool = true
    let myObject = {
        testBool: tmpBool ? 'pass' : 'failed',
        testBoolFn: function () {
            let ret = tmpBool ? 'pass' : 'failed'
            return ret.toUpperCase()
        }
    }
    console.log('Object boolean1 value:', myObject.testBool)
    console.log('Object boolean2 value:', myObject.testBoolFn())

    // #2
    function Student (name, age) {
        this.name = name
        this.age = age
        this.getName = function () {
            return this.name
        }
    }
    Student.prototype.sayHello = function () {
        console.log(`Hello, my name is ${this.name}, I am ${this.age} years old.`)
    }

    let s = new Student('Henry', 21)
    console.log('name:', s.getName())
    s.sayHello()
}


let testAddFnAttr = function () {
    let tmpObj = {
        name: 'zheng jin',
        title: 'tester'
    }
    tmpObj['toMessage'] = function () {
        console.log(`Message: ${this.name}'s title is ${this.title}`)
    }

    tmpObj.toMessage()
}


let testObjectUnpkg = function () {
    // matched by the property name in object
    // #1
    let printFullName = function ({ firstName, lastName }) {
        console.log(`hello, ${firstName} ${lastName}`)
    }

    let tmpName = {
        national: 'China',
        firstName: 'zheng',
        lastName: 'jin',
        age: 30
    }
    printFullName(tmpName)

    // #2
    let getUserInfo = function () {
        return {
            national: 'China',
            firstName: 'zheng',
            lastName: 'jin',
            age: 30
        }
    }

    const { firstName, lastName } = getUserInfo()
    console.log('user name: ' + firstName + ' ' + lastName)
}


let testArrayUnpkg = function () {
    // match the order in array
    let tmpArr = ['JS', 'Python', 'Java']
    const [first, second] = tmpArr
    console.log(`program: ${first}, ${second}`)
}


let testArgsPkg = function () {
    let argsJoin = function (...args) {
        console.log(args.join(' '))
    }
    argsJoin('hello', 'world', 'zheng', 'jin')
}


let testGetTcName01 = function () {
    const tmpStr = `Log 2) [Smoke test] [SE-02-Settings-Domain]: 
    3) [CI Automation] [MP-01-001-Add Multiple Pages]:
    4) Editor-Basic:
    Job succeeded`

    const reg = /\d\)\s\[.+:/g
    let m = tmpStr.match(reg)
    for (let tc of m) {
        console.log(tc)
    }
}


let testGetTcName02 = function () {
    const fs = require('fs')
    fs.readFile('./testdata/runlog_1020.log', function (err, data) {
        if (err) {
            console.error(err)
            return
        }

        const reg = /\d\)\s\[.+:/g
        let m = data.toString().match(reg)
        for (let tc of m) {
            console.log(tc)
        }
    })
}


if (require.main === module) {
    // testPrintVar()
    // testPrintVar('henry')

    // testPathJoin()
    // testJsonLoad()

    // testPrintFuncName(testPathJoin)
    // testFuncArgs()
    // testCallBack()
    // testSelfRunFunc()

    // testObject()
    // testAddFnAttr()

    // testObjectUnpkg()
    // testArrayUnpkg()
    // testArgsPkg()

    // testGetTcName01()
    // testGetTcName02()
    console.log("hello world DONE.")
}
