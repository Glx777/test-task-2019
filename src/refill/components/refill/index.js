import * as Yup from 'yup'
import { withFormik } from 'formik'

import Refill from './refill'

const validationSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone is required!')
        .test('', 'Phone number is too short!', function(value) {
            const finalValue = value && value.replace(/\D/g, '')

            return finalValue && finalValue.length > 10
        }),
    amount: Yup.string()
        .required('Amount cannot be empty!')
        .test('', 'Amount cannot exceed 1000!', function(value) {
            const finalValue =
                value &&
                Number(value.substring(0, value.length - 1).replace(',', ''))
            return finalValue < 1001
        })
        .test('', 'Amount cannot be less than 1!', function(value) {
            const finalValue =
                value &&
                Number(value.substring(0, value.length - 1).replace(',', ''))

            return finalValue > 0
        })
})

const mapPropsToValues = () => ({
    phone: '',
    amount: ''
})

export default withFormik({
    validationSchema,
    mapPropsToValues
})(Refill)
