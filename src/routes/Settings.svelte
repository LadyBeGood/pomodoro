<script lang="ts">
    /*==============================*/
    /* Imports                      */
    /*==============================*/
    import type { Snippet } from "svelte";
    import { fade, slide } from "svelte/transition";
    import { navigate } from "../router";
    import LightBeam from "../components/LightBeam.svelte";
    import { settings as sharedSettings } from "../shared/settings.svelte";
    import Dialog from "../components/Dialog.svelte";

    /*==============================*/
    /* Types                        */
    /*==============================*/
    type SettingOption = { 
        value: string,
        selected: boolean 
    }

    type SelectionSettingData = {
        id: `${string}-setting-${number}`,
        type: "loop",
        name: string,
        key: keyof typeof sharedSettings,
        options: SettingOption[],
    }
    
    type ActionSettingData = {
        id: `${string}-setting-${number}`,
        type: "dialog",
        name: string,
        key: keyof typeof sharedSettings,
        snippet: Snippet,
        value: string,
    }

    type SettingData =
        | SelectionSettingData
        | ActionSettingData;


    type Setting = {
        type: string,
        isActive: boolean,
        data: SettingData[]
    }

            
    /*==============================*/
    /* Constants                    */
    /*==============================*/
    const daysOfWeek = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];

    const settings = $state<Array<Setting>>([
        { 
            type: "general", 
            isActive: true,
            data: [
                {
                    id: "general-setting-1",
                    type: "loop",
                    name: "Theme",
                    key: "theme",
                    options: [
                        {
                            value: "Dark",
                            selected: sharedSettings.theme === "Dark"
                        },
                        {
                            value: "Light",
                            selected: sharedSettings.theme === "Light"
                        }
                    ],
                },
                {
                    id: "general-setting-2",
                    type: "loop",
                    name: "Default home page",
                    key: "defaultHomePage",
                    options: [
                        {
                            value: "Pomodoro",
                            selected: sharedSettings.defaultHomePage === "Pomodoro"
                        },
                        {
                            value: "Timer",
                            selected: sharedSettings.defaultHomePage === "Timer"
                        }
                    ],
                },
                {
                    id: "general-setting-3",
                    type: "loop",
                    name: "Send notifications",
                    key: "sendNotifications",
                    options: [
                        {
                            value: "Yes",
                            selected: sharedSettings.sendNotifications === "Yes"
                        },
                        {
                            value: "No",
                            selected: sharedSettings.sendNotifications === "No"
                        }
                    ],

                },
            ]
        },
        {
            type: "session",
            isActive: false,
            data: [
                {
                    id: "session-setting-1",
                    type: "dialog",
                    name: "Session length",
                    key: "sessionLength",
                    snippet: sessionLengthSnippet,
                    value: sharedSettings.sessionLength
                },
                {
                    id: "session-setting-2",
                    type: "dialog",
                    name: "Break length",
                    key: "breakLength",
                    snippet: breakLengthSnippet,
                    value: sharedSettings.breakLength
                },
                {
                    id: "session-setting-3",
                    type: "loop",
                    name: "Auto start session",
                    key: "autoStartSession",
                    options: [
                        {
                            value: "Yes",
                            selected: sharedSettings.autoStartSession === "Yes",
                        },
                        {
                            value: "No",
                            selected: sharedSettings.autoStartSession === "No",
                        }
                    ],
                },
                {
                    id: "session-setting-4",
                    type: "loop",
                    name: "Auto start break",
                    key: "autoStartBreak",
                    options: [
                        {
                            value: "Yes",
                            selected: sharedSettings.autoStartBreak === "Yes",
                        },
                        {
                            value: "No",
                            selected: sharedSettings.autoStartBreak === "No",
                        }
                    ],
                },
            ]
        },
        {
            type: "clock",
            isActive: false,
            data: [
                {
                    id: "date-and-time-setting-1",
                    type: "dialog",
                    name: "Start of the week",
                    key: "startOfTheWeek",
                    value: sharedSettings.startOfTheWeek,
                    snippet: startOfTheWeekSnippet,

                },
                {
                    id: "date-and-time-setting-2",
                    type: "dialog",
                    name: "Start of the day",
                    key: "startOfTheDay",
                    value: sharedSettings.startOfTheDay,
                    snippet: startOfTheDaySnippet,
                },
            ]
        },
    ]);





    /*==============================*/
    /* State                        */
    /*==============================*/
    let activeSettings = $state(settings[0].data);
    let isDialogOpen = $state(false);
    let dialogContents = $state<Snippet | null>(null);

    /*==============================*/
    /* Refs                         */
    /*==============================*/
    let settingTypesElement: HTMLDivElement;
    let settingsMainElement: HTMLDivElement;

    /*==============================*/
    /* Helpers                      */
    /*==============================*/
    function getRotationAngle() {
        const angleInRadians = Math.atan2(
            window.innerHeight * 0.1,
            window.innerWidth,
        );
        const angleInDegrees = angleInRadians * (180 / Math.PI);
        return -angleInDegrees;
    }

    function updateLayout() {
        settingTypesElement.style.transform = `rotate(${getRotationAngle()}deg)`;
    }

    /*==============================*/
    /* Handlers                     */
    /*==============================*/
    function handleSettingsTabChange(settings: Setting[], i: number) {
        for (let j = 0; j < settings.length; j++) {
            settings[j].isActive = false;
        }
        settings[i].isActive = true;
        activeSettings = settings[i].data;
    }

    function handleLoop(options: SettingOption[], name: keyof typeof sharedSettings) {
        let nextSelectedIndex = -1;

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                nextSelectedIndex = (i + 1) % options.length;
            }
            options[i].selected = false;
        }

        options[nextSelectedIndex].selected = true;
        sharedSettings[name] = options[nextSelectedIndex].value;
    }

    function openDialog(contents: Snippet) {
        dialogContents = contents;
        isDialogOpen = true;
    }
    
    /*==============================*/
    /* Effects                      */
    /*==============================*/
    $effect(() => {
        updateLayout();
        window.addEventListener("resize", updateLayout);

        // Cleanup
        return () => {
            window.removeEventListener("resize", updateLayout);
        };
    });


</script>


<!-- overlay -->
<div
    class="z-10 fixed top-0 left-0 right-0 bottom-0 bg-(--blackout)/95"
    out:slide={{ duration: 250, delay: 250 }}
></div>

<!-- close button -->
<button
    aria-label="Close settings"
    onclick={() => navigate(-1)}
    class="absolute left-5 top-5 z-20 text-(--luxury-white)"
    transition:fade={{ duration: 250 }}
>
    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" /></svg>
</button>

<!-- light beam -->
<LightBeam origin="right" />

<!-- setting tablist -->
<div
    role="tablist" 
    aria-label="Settings tablist"
    bind:this={settingTypesElement}
    in:slide={{ duration: 250, delay: 250 }}
    out:slide={{ duration: 250 }}
    class="z-10 overflow-auto pt-4 w-[90vw] absolute left-0 top-[10svh] dark-scrollbar origin-top-left flex gap-8 justify-start pl-8 text-sm tracking-widest"
>
    {#each settings as setting, i}
        <button
            role="tab"
            aria-selected={setting.isActive}
            class:active={setting.isActive}
            class=" font-bold text-(--blackout)/62 hover:text-(--blackout) transition-colors text-nowrap"
            onclick={() => handleSettingsTabChange(settings, i)}
        >
            {setting.type.toUpperCase()}
        </button>
    {/each}
</div>

<!-- settings -->
<div
    bind:this={settingsMainElement}
    in:slide={{ duration: 250, delay: 250 }}
    out:slide={{ duration: 250 }}
    class="z-10 absolute left-0 bottom-0 w-[90vw] h-[82svh] grid"
>
    <div class="flex flex-col gap-10 overflow-auto text-right">
        {#each activeSettings as activeSetting (activeSetting.id)}
            {#if activeSetting.type === "loop"}
                <button style="padding-right: calc(0 * 0.9vw);" class="" onclick={() => handleLoop(activeSetting.options, activeSetting.key)}>
                    <div class="font-medium">{activeSetting.name}</div>
                    <div class="text-(--blackout)/70 text-xs">{activeSetting.options.find(option => option.selected)?.value}</div>
                </button>
            {:else if activeSetting.type === "dialog"}
                <button style="padding-right: calc(0 * 0.9vw);" class="" onclick={() => openDialog(activeSetting.snippet)}>
                    <div class="font-medium">{activeSetting.name}</div>
                    <div class="text-(--blackout)/70 text-xs">{activeSetting.value}</div>
                </button>
            {/if}
        {/each}
    </div>

    <div class="self-end w-full p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="font-semibold">Created by LadyBeGood</p>
                <p class="text-xs text-(--blackout)/70">
                    with {sharedSettings.theme === "Dark" ? "🖤" : "🤍"}
                </p>
            </div>

            <div class="flex gap-4 items-center">
                <a
                    title="Github Repository"
                    target="_blank"
                    href="https://github.com/LadyBeGood/pomodoro"
                    class="w-12 h-12 flex items-center justify-center rounded-full bg-(--blackout) text-(--luxury-white) font-bold shadow-lg focus-visible:outline-(--blackout) focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10" /></svg>
                </a>
            </div>
        </div>
    </div>
</div>




<!-------------------------------->
<!-- Snippets                   -->
<!-------------------------------->

{#snippet startOfTheWeekSnippet()}
    <div class="flex flex-col w-full">
        {#each daysOfWeek as week}
            <button 
                class="hover:bg-(--blackout) hover:text-(--luxury-white) h-13 w-full px-4"
                onclick={event => {
                    console.log(event.currentTarget.textContent);
                    sharedSettings.startOfTheWeek = event.currentTarget.textContent;
                }}
            >
                {week}
            </button>
        {/each}
    </div>
{/snippet}

{#snippet startOfTheDaySnippet()}
    startOfTheDaySnippet
{/snippet}

{#snippet breakLengthSnippet()}
    breakLengthSnippet
{/snippet}

{#snippet sessionLengthSnippet()}
    sessionLengthSnippet
{/snippet}

<!-------------------------------->
<!-- Dialog                     -->
<!-------------------------------->
<Dialog bind:isDialogOpen children={dialogContents}></Dialog>


<style>
    .active {
        color: var(--blackout);
    }
</style>