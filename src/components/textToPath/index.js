import opentype from "opentype.js"

const ConvertTexttoPath = async (text, x=10, y=20, fontSize=40, fill="black") => {
    let pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const font = await opentype.load('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff');
    const pathData = font.getPath(text, x, y, fontSize).toPathData();
    pathElement.setAttribute('d', pathData);
    pathElement.setAttribute('fill', fill);
    console.log("pathData, pathElement",pathData, pathElement)
    return pathElement;
}

export default ConvertTexttoPath;