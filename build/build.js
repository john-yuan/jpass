const fse = require('fs-extra')
const ejs = require('ejs')
const path = require('path')

const SRC_DIR = path.resolve(__dirname, '../src')
const DIST_DIR = path.resolve(__dirname, '../dist')
const JSBN_DIR = path.resolve(SRC_DIR, 'jsbn')
const LIB_DIR = path.resolve(SRC_DIR, 'lib')
const CMD_TEMPALTE = fse.readFileSync(path.resolve(__dirname, 'templates/cmd.ejs')).toString()
const UMD_TEMPALTE = fse.readFileSync(path.resolve(__dirname, 'templates/umd.ejs')).toString()
const CMD_FILENAME = path.resolve(DIST_DIR, 'jpass.cmd.js')
const UMD_FILENAME = path.resolve(DIST_DIR, 'jpass.umd.js')

const JSBN_FILES = [
    path.resolve(JSBN_DIR, '01-jsbn.js'),
    path.resolve(JSBN_DIR, '02-jsbn2.js'),
    path.resolve(JSBN_DIR, '03-prng4.js'),
    path.resolve(JSBN_DIR, '04-rng.js'),
    path.resolve(JSBN_DIR, '05-base64.js'),
    path.resolve(JSBN_DIR, '06-rsa.js'),
    path.resolve(JSBN_DIR, '07-rsa2.js'),
]

const EXTEND_FILES = [
    path.resolve(LIB_DIR, '01-extension.js'),
    path.resolve(LIB_DIR, '02-byte-utils.js'),
    path.resolve(LIB_DIR, '03-byte-mode.js'),
    path.resolve(LIB_DIR, '04-url-mode.js'),
    path.resolve(LIB_DIR, '05-jpass-rsa.js'),
    path.resolve(LIB_DIR, '06-exports.js'),
]

let code = ''

JSBN_FILES.forEach(filename => {
    code = code + fse.readFileSync(filename).toString().trim() + '\n'
})

EXTEND_FILES.forEach(filename => {
    code = code + fse.readFileSync(filename).toString().trim() + '\n'
})

const CMD_CODE = ejs.render(CMD_TEMPALTE, { code: code })
const UMD_CODE = ejs.render(UMD_TEMPALTE, { code: code })

fse.outputFileSync(CMD_FILENAME, CMD_CODE)
fse.outputFileSync(UMD_FILENAME, UMD_CODE)

console.log('Build successfully!');
