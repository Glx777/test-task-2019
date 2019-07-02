const func = (s, a, b) => {

    if (!s) {
        return -1
    }

    var aIndex = -1
    var bIndex = -1

    if (aIndex === -1 && bIndex === -1) {
        if (s.lastIndexOf(a) > 0 && a) {
            aIndex = s.lastIndexOf(a)
        }

        if (s.lastIndexOf(b) > 0 && b) {
            bIndex = s.lastIndexOf(b)
        }
    }
    
    if (aIndex !== -1) {
        if (bIndex === -1) {
            return aIndex
        }

        return Math.max(aIndex, bIndex)
    }
    
    if (bIndex !== -1) {
        return bIndex
    }

    return -1
}