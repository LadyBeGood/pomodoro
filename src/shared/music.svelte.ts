
/*==============================*/
/* Types                        */
/*==============================*/
export type WhiteNoise = {
    type: string;
    isActive: boolean;
    data: {
        id: number;
        name: string;
        creator: string;
        file: string;
    }[];
};


/*==============================*/
/* State                        */
/*==============================*/
export const music = $state({
    whiteNoises: [
        {
            type: "nature",
            isActive: true,
            data: [
                { id: 136403, name: "Stream Nov", creator: "juskiddink", file: "136403__juskiddink__stream-nov.opus" },
                { id: 827225, name: "Rain", creator: "filmscore", file: "827225__filmscore__rain-lightning.opus" },
                { id: 521772, name: "Rain on rooftop", creator: "mrfossy", file: "521772__mrfossy__indoors_shed_rainontinroof_02.opus" },
                { id: 733288, name: "Rain and thunder", creator: "soundrack", file: "733288__soundrack__thunder-and-rain-ambience-01.opus" },
            ],
        },
        {
            type: "social",
            isActive: false,
            data: [
                { id: 167057, name: "School Canteen", creator: "slag777", file: "167057__slag777__school-canteen-atmosphere.opus" },
                { id: 540299, name: "Coffee shop", creator: "aidansamuel", file: "540299__aidansamuel__cofee-shop-ambience.opus" },
                { id: 627079, name: "Diner in Virginia", creator: "laggardson", file: "627079__laggardson__diner-in-virginia.opus" },
            ],
        },
        {
            type: "indoor",
            isActive: false,
            data: [],
        },
    ] as WhiteNoise[],

    activeWhiteNoises: [] as WhiteNoise["data"],
    activeWhiteNoise: null as unknown as WhiteNoise["data"][number],
    isPlaying: false,
});

// svelte-ignore state_referenced_locally
music.activeWhiteNoises = music.whiteNoises[0].data;
// svelte-ignore state_referenced_locally
music.activeWhiteNoise = JSON.parse(localStorage.getItem("activeWhiteNoise") ?? "null") ?? music.activeWhiteNoises[0];

export const audio = new Audio();



/*==============================*/
/* Handlers                     */
/*==============================*/
export function handleWhiteNoiseTabChange(i: number) {
    for (let j = 0; j < music.whiteNoises.length; j++) {
        music.whiteNoises[j].isActive = false;
    }
    music.whiteNoises[i].isActive = true;
    music.activeWhiteNoises = music.whiteNoises[i].data;
}

export function playAdjacent(offset: number) {
    const i = music.activeWhiteNoises.indexOf(music.activeWhiteNoise);
    music.activeWhiteNoise = music.activeWhiteNoises[(i + offset + music.activeWhiteNoises.length) % music.activeWhiteNoises.length];
}

export function changeActiveWhiteNoise(whiteNoise: WhiteNoise["data"][number]) {
    music.activeWhiteNoise = whiteNoise;
}

export function handlePlayPause() {
    music.isPlaying = !music.isPlaying;
}