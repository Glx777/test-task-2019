const func = (s, a, b) => {
    if (!s || typeof s !== 'string') return -1

    if (s.lastIndexOf(a) > 0 && a && (s.lastIndexOf(b) < 1 || !b))
        return s.lastIndexOf(a)

    if (s.lastIndexOf(a) > 0 && a && s.lastIndexOf(b) > 0 && b)
        return Math.max(s.lastIndexOf(a), s.lastIndexOf(b))

    if (s.lastIndexOf(b) > 0 && b) return s.lastIndexOf(b)

    return -1
}
