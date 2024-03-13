interface ActivityV1 {
    name: string,
    previousActivities: number[], //indeksy innych aktywności
    time: number
}

export default ActivityV1;