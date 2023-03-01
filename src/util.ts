export const isToday = (fdate: Date, sdate: Date): boolean => {
    return fdate.getDate() === sdate.getDate() &&
        fdate.getMonth() === sdate.getMonth() &&
        fdate.getFullYear() === sdate.getFullYear()
}
export const generateUUID = () => {
    let
        d = new Date().getTime(),
        d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};

export const  getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor.substring(1, 2), 16);
    const g = parseInt(hexColor.substring(3, 2), 16);
    const b = parseInt(hexColor.substring(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return (yiq >= 60) ? '#000000' : '#FFFFFF';
}
export const  rgbToHex = (rgb: string): string => {
    const regex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
    const result = regex.exec(rgb);

    if (!result) {
        return rgb;
    }

    const r = parseInt(result[1]);
    const g = parseInt(result[2]);
    const b = parseInt(result[3]);

    const hex = ((r << 16) | (g << 8) | b).toString(16).toUpperCase().padStart(6, '0');

    return `#${hex}`;
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];