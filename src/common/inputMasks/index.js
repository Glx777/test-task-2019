import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export const phoneMask = [
    '+',
    '7',
    ' ',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
]

export const priceMask = createNumberMask({ prefix: '', suffix: ' ₽' })
