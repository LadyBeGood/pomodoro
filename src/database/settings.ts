

type SettingSection = "general" | "pomodoro" | "statistics";
type SettingOption = { value: string; selected: boolean };

type SelectionSetting<T extends SettingSection> = {
    id: `${T}-setting-${number}`,
    type: "choose" | "loop",
    name: string,
    options: SettingOption[],
}

type ActionSetting<T extends SettingSection> = {
    id: `${T}-setting-${number}`,
    type: "action",
    name: string,
    action: () => void,
    value: string
}

export type Setting<T extends SettingSection> =
    | SelectionSetting<T>
    | ActionSetting<T>;


const generalSettings: Setting<"general">[] = [
    {
        id: "general-setting-1",
        type: "loop",
        name: "Theme",
        options: [
            {
                value: "Dark",
                selected: true
            },
            {
                value: "Light",
                selected: false
            }
        ]
    },
    {
        id: "general-setting-2",
        type: "loop",
        name: "Default home page",
        options: [
            {
                value: "Pomodoro",
                selected: true
            },
            {
                value: "Timer",
                selected: false
            }
        ]
    },
    {
        id: "general-setting-3",
        type: "loop",
        name: "Send notifications",
        options: [
            {
                value: "Yes",
                selected: true
            },
            {
                value: "No",
                selected: false
            }
        ]
    },
]

const pomodoroSettings: Setting<"pomodoro">[] = [
    {
        id: "pomodoro-setting-1",
        type: "action",
        name: "Pomodoro length",
        action: () => undefined,
        value: "25 minutes"
    },
    {
        id: "pomodoro-setting-2",
        type: "action",
        name: "Break length",
        action: () => undefined,
        value: "5 minutes"
    },
    {
        id: "pomodoro-setting-3",
        type: "loop",
        name: "Auto start pomodoro",
        options: [
            {
                value: "Yes",
                selected: false,
            },
            {
                value: "No",
                selected: true,
            }
        ]
    },
    {
        id: "pomodoro-setting-4",
        type: "loop",
        name: "Auto start break",
        options: [
            {
                value: "Yes",
                selected: false,
            },
            {
                value: "No",
                selected: true,
            }
        ]
    },
]

const statisticsSettings: Setting<"statistics">[] = [
    {
        id: "statistics-setting-1",
        type: "choose",
        name: "Start of the week",
        options: [
            {
                value: "Sunday",
                selected: false
            },
            {
                value: "Monday",
                selected: true
            },
            {
                value: "Tuesday",
                selected: false
            },
            {
                value: "Wednesday",
                selected: false
            },
            {
                value: "Thursday",
                selected: false
            },
            {
                value: "Friday",
                selected: false
            },
            {
                value: "Saturday",
                selected: false
            },
        ]
    },
    {
        id: "statistics-setting-2",
        type: "action",
        name: "Start of the day",
        action: () => undefined,
        value: "05:00 AM"
    },
]

export const settings = {
    general: generalSettings,
    pomodoro: pomodoroSettings,
    statistics: statisticsSettings,
} as const;