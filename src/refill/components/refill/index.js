import * as Yup from 'yup'
import { withFormik } from 'formik'

import Refill from './refill'

import toast from '../../../services/toast'

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

const handleSubmit = (values, { props }) => {
    const randomValue = Math.floor(Math.random() * Math.floor(2))

    if (randomValue) {
        toast.success('Success')
        props.history.push('/')
    } else {
        toast.error('Failure')
    }
}

export default withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit
})(Refill)
