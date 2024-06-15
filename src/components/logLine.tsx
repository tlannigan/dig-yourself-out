import { LogLevel } from '@/constants/enums'

export default function LogLine({ line, lineNumber }: { line: string; lineNumber: number }) {
    const logLevel = getLogLevel(line)
    const styledLine = () => {
        if (logLevel !== LogLevel.STACKTRACE) {
            return (
                <span id={`${lineNumber + 1}`} className={logLevel} style={{ display: 'block', lineHeight: '20px' }}>
                   {line}
               </span>
            )
        } else {
            return getStacktraceLine(line, lineNumber)
        }
    }
    return styledLine()
}

export function isStacktrace(line: string) {}

export function getLogLevel(line: string) {
    if (line.includes('/INFO]')) {
        return LogLevel.INFO
    } else if (line.includes('/WARN]')) {
        return LogLevel.WARNING
    } else if (line.includes('/ERROR]') || line.includes('/FATAL]')) {
        return LogLevel.ERROR
    } else if (line.match(/((.\w+Exception:)|(.\w+Error:))/g)) {
        return LogLevel.ERROR
    } else if (line.trim().startsWith('at ')) {
        return LogLevel.STACKTRACE
    } else if (line.startsWith('      Repeated')) {
        return LogLevel.REPEATED
    } else {
        return LogLevel.UNKNOWN
    }
}

// at com.tterrag.registrate.util.entry.RegistryEntry.get(RegistryEntry.java:114) ~[Registrate-MC1.20-1.3.11.jar%23602!/:?] {re:mixin,re:classloading}
export function getStacktraceLine(line: string, lineNumber: number) {
    const firstUpperCase = indexOfFirstUppercase(line)
    return (
        <span id={`${lineNumber + 1}`} className={LogLevel.STACKTRACE} style={{ display: 'block', lineHeight: '20px' }}>
            <span className="class-path"> {getClassPath(line, firstUpperCase)}</span>
            <span className="class-name">{getClassName(line, firstUpperCase)}</span>
            <span className="method">{getMethod(line, firstUpperCase)}</span>
            <span className="class-file">{getClassFile(line)} </span>
            <span className="jar">{getJar(line)} </span>
            <span className="mixin-list">{getMixinList(line)}</span>
        </span>
    )
}

export function getClassPath(line: string, firstUpperCase: number) {
    const start = line.indexOf('at ') - 3
    const end = firstUpperCase - 1
    if (start >= 0 && end >= 0) {
        return line.substring(start, end)
    } else {
        return ''
    }
}

export function getClassName(line: string, firstUpperCase: number) {
    const start = firstUpperCase - 1
    const end = line.indexOf('.', start + 1)
    if (start >= 0 && end >= 0) {
        return line.substring(start, end)
    } else {
        return ''
    }
}

export function getMethod(line: string, firstUpperCase: number) {
    const start = line.indexOf('.', firstUpperCase)
    const end = line.indexOf('(')
    if (start >= 0 && end >= 0) {
        return line.substring(start, end)
    } else {
        return ''
    }
}

export function getClassFile(line: string) {
    const start = line.indexOf('(')
    const end = line.indexOf(')') + 1
    if (start >= 0 && end >= 0) {
        return line.substring(start, end)
    } else {
        return ''
    }
}

export function getJar(line: string) {
    const start = line.indexOf('~[')
    const end = line.indexOf(']') + 1
    if (start >= 0 && end >= 0) {
        return line.substring(start, end)
    } else {
        return ''
    }
}

export function getMixinList(line: string) {
    const start = line.indexOf('{')
    if (start >= 0) {
        return line.substring(start, line.length - 1)
    }
    return ''
}

export function indexOfFirstUppercase(string: string) {
    let index = 0

    // Skip stacktraces what start with TRANSFORMER or MC-BOOTSTRAP
    const firstCharacterOfClassPath = string.trim()[3]
    if (firstCharacterOfClassPath == firstCharacterOfClassPath.toUpperCase() && (firstCharacterOfClassPath.match(/[a-z]/i))) {
        index = 19
    }

    for (let i = index; i < string.length; i++) {
        if (string[i] == string[i].toUpperCase() && (string[i].match(/[a-z]/i))) {
            return i
        }
    }

    // Catch obfuscated class names
    if (string.includes('class_')) return string.indexOf('class_')

    return -1
}