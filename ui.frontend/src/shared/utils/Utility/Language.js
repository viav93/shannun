export const getHTMLLanguage = () => {
    const htmlEle = document.getElementsByTagName('html');

    return (htmlEle[0] && htmlEle[0].getAttribute('lang')) || 'en';
}