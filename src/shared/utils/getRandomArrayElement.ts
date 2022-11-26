export const getRandomArrayElement = <Element>(list: Element[]): Element => {
    const randomElement = list[Math.floor((Math.random() * list.length))]

    if (!randomElement) {
        throw new Error('Random element not found')
    }

    return randomElement
}
