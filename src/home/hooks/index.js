import { useState, useCallback, useEffect } from 'react'

import toast from '../../services/toast'

import data from '../../common/data.json'

export const useData = () => {
    const [operators, setOperators] = useState([])

    const fakeRequest = useCallback(
        () =>
            new Promise(resolve => {
                resolve(data)
            }),
        []
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fakeRequest()

                res && setOperators(res)
            } catch (e) {
                toast.error(e)
            }
        }

        fetchData()
    }, []) //eslint-disable-line

    return operators
}
