export const graphqlProperty = (property: any, nullReturnValue?: any) => {
    if (property === null) {
        return nullReturnValue || undefined;
    }
    return property;
};
