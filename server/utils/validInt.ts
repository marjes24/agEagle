
export const isValidInt = (x: any) => {
    return !isNaN(parseInt(x));
};

export const getInt = (x: string) => {
    return parseInt(x);
}