import { ReactElement } from 'react'

/**
 * Filters a list for unique elements based on their children elements
 * Ignores key values in parent
 * 
 * @param list
 * @returns 
 */
export function unique(list: ReactElement[]) {
    const uniqueElements: ReactElement[] = []
    for (const item of list) {
        let isUnique = true
        const text = item.props.children.join('')
        for (const element of uniqueElements) {
            if (text === element.props.children.join('')) isUnique = false
        }
        if (isUnique) uniqueElements.push(item)
    }
    return uniqueElements
}