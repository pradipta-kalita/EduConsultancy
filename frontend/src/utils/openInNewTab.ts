export const openInNewTab = (id: string) => {
    const url = `/blogs/${id}`;
    window.open(url, '_blank');
};