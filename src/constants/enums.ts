export enum FileType {
    STANDARD_LOG,
    EXTENDED_MULTIMC_LOG,
    CRASH_REPORT,
    LAUNCHER_LOG,
    HOTSPOT_CRASH_DUMP,
    SERVER_PROPERTIES,
    UNKNOWN,
}

export enum Launcher {
    VANILLA,
    CURSEFORGE,
    TWITCH,
    PRISM,
    POLYMC,
    MULTIMC,
    MODRINTH,
    FTB_APP,
    ATLAUNCHER,
    GDLAUNCHER,
    UNKNOWN,
}

export enum Equality {
    EQ,
    NOT,
    GTE,
    GT,
    LTE,
    LT,
    RANGE,
}

export enum LogLevel {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    STACKTRACE = 'stacktrace',
    REPEATED = 'repeated',
    UNKNOWN = 'unknown'
}

export enum AlertLevel {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}